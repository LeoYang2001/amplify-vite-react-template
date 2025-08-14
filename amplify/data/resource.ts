import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Word } from "../types/Word";

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
