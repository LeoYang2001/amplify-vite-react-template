import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [wordsLists, setWordsLists] = useState<
    Array<Schema["WordsList"]["type"]>
  >([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [type, setType] = useState("first"); // 'first' or 'backup'
  const [words, setWords] = useState<Array<Schema["Word"]["type"]>>([]);
  const [wordInput, setWordInput] = useState("");
  const [rawJsonInput, setRawJsonInput] = useState("");
  const [selectedTypeForJsonWord, setSelectedTypeForJsonWord] = useState("");
  const { user, signOut } = useAuthenticator();

  // Only show types 'collected' and 'learned' in dropdown
  const allowedTypes = ["collected", "learned"];
  const availableLists = wordsLists.filter((l) =>
    allowedTypes.includes(l.type)
  );

  useEffect(() => {
    // Fetch all WordsLists for the current user
    const setup = async () => {
      const res = await client.models.WordsList.list();
      setWordsLists(res.data);
      // If no 'collected' or 'learned' lists exist, create them automatically
      const typesInDb = res.data.map((l) => l.type);
      for (const t of allowedTypes) {
        if (!typesInDb.includes(t)) {
          const created = await client.models.WordsList.create({ type: t });
          if (created.data)
            setWordsLists((prev) => [
              ...prev,
              created.data as unknown as Schema["WordsList"]["type"],
            ]);
        }
      }
    };
    setup();
  }, []); // Only run once on mount

  useEffect(() => {
    // Fetch words for the selected WordsList
    if (selectedListId) {
      client.models.Word.list({
        filter: { wordsListId: { eq: selectedListId } },
      }).then((res) => {
        setWords(res.data);
      });
    } else {
      setWords([]);
    }
  }, [selectedListId]);

  async function addWord() {
    if (!wordInput || !selectedListId) return;
    const wordData = { word: wordInput, timeStamp: new Date().toISOString() };
    try {
      await client.models.Word.create({
        id: crypto.randomUUID(),
        data: JSON.stringify(wordData),
        wordsListId: selectedListId,
      });
      setWordInput("");
      // Refresh words
      const res = await client.models.Word.list({
        filter: { wordsListId: { eq: selectedListId } },
      });
      setWords(res.data);
    } catch (error) {
      console.error("Error adding word:", error);
      alert("Failed to add word. Please try again.");
    }
  }

  async function createWordsList() {
    // Create a new WordsList of the selected type if it doesn't exist
    if (!wordsLists.find((l) => l.type === type)) {
      try {
        const res = await client.models.WordsList.create({ type });
        if (res.data) setSelectedListId(res.data.id);
      } catch (error) {
        console.error("Error creating WordsList:", error);
        alert("Failed to create WordsList. Please try again.");
      }
    }
  }

  async function createWord() {
    console.log("Creating test WordsList...");
    // Create a WordsList of type 'test'

    const testWord = {
      id: crypto.randomUUID(),
      data: JSON.stringify({
        word: "example",
        timeStamp: new Date().toISOString(),
      }),
    };
    console.log(client.models);
    const wordRes = await client.models.Word.create(testWord);

    console.log(wordRes);
    const listRes = await client.models.WordsList.create({ type: "test" });

    if (listRes.data && wordRes.data) {
      // 3. Update the word to associate with the WordsList
      await client.models.Word.update({
        id: wordRes.data.id,
        wordsListId: listRes.data.id,
      });
    }
  }

  async function handleAddJsonWord() {
    if (!rawJsonInput || !selectedTypeForJsonWord)
      return alert("JSON and type required");
    let parsed;
    try {
      parsed = JSON.parse(rawJsonInput);
    } catch (e) {
      alert("Invalid JSON");
      return;
    }
    const list = availableLists.find((l) => l.type === selectedTypeForJsonWord);
    if (!list) return alert("Selected WordsList type does not exist");
    try {
      await client.models.Word.create({
        id: crypto.randomUUID(),
        data: parsed,
        wordsListId: list.id,
      });
      setRawJsonInput("");
      alert("Word added to list!");
      if (selectedListId === list.id) {
        const res = await client.models.Word.list({
          filter: { wordsListId: { eq: list.id } },
        });
        setWords(res.data);
      }
    } catch (error) {
      console.error("Error adding JSON word:", error);
      alert("Failed to add word. Please try again.");
    }
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s Lexsee test</h1>
      <button onClick={signOut}>Sign out</button>
      <h2>Add Raw JSON Word</h2>
      <textarea
        value={rawJsonInput}
        onChange={(e) => setRawJsonInput(e.target.value)}
        placeholder="Paste raw JSON for word here"
        rows={5}
        style={{ width: "100%" }}
      />
      <select
        value={selectedTypeForJsonWord}
        onChange={(e) => setSelectedTypeForJsonWord(e.target.value)}
      >
        <option value="">Select WordsList type</option>
        {availableLists.map((list) => (
          <option key={list.id} value={list.type}>
            {list.type}
          </option>
        ))}
      </select>
      <button onClick={handleAddJsonWord}>Add JSON Word</button>
      {/* ...existing code... */}
    </main>
  );
}

export default App;
