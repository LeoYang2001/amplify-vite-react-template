import { a } from "@aws-amplify/backend";

export const Phonetic = a.model({
  text: a.string(),
  audioUrl: a.string(),
});

export const Meaning = a.model({
  definition: a.string(),
  partOfSpeech: a.string(),
  synonyms: a.string().array(),
  antonyms: a.string().array(),
});

export const Word = a.model({
  id: a.string(),
  word: a.string(),
  imgUrl: a.string(),
  //   meanings: a.ref("Meaning").array(),
  //   phonetics: a.ref("Phonetic").array(),
  listType: a.string(), // e.g., "favorites", "to-learn"
  timeStamp: a.string(),
});
