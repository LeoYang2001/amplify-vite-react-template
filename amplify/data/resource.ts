import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const Phonetic = a.model({
  text: a.string(),
  audioUrl: a.string(),
});
const Meaning = a.model({
  definition: a.string(),
  partOfSpeech: a.string(),
  synonyms: a.string().array(),
  antonyms: a.string().array(),
});

const Word = a.model({
  id: a.string(),
  word: a.string(),
  imgUrl: a.string(),
  meanings: a.ref("Meaning").array(),
  phonetics: a.ref("Phonetic").array(),
  timeStamp: a.string(),
});

const schema = a
  .schema({
    Todo: a.model({
      content: a.string(),
    }),
    WordsList: a.model({
      uid: a.string(), // User's unique ID
      collectedWords: a.ref("Word").array(),
    }),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
