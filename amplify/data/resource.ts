import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Meaning, Phonetic, Word } from "../types/Word";

const schema = a
  .schema({
    Todo: a.model({
      content: a.string(),
    }),
    WordsList: a.model({
      uid: a.string(), // User's unique ID
      collectedWords: a.ref("Word").array(),
    }),
    Word, // <-- Add this line
    Meaning, // <-- Add this line
    Phonetic, // <-- Add this line
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
