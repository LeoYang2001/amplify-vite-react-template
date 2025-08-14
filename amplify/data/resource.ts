import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Todo: a.model({
      content: a.string(),
    }),
    Member: a.model({
      name: a.string().required(),
      teamId: a.id(), // reference to Team
      team: a.belongsTo("Team", "teamId"), // each member belongs to one team only
    }),
    Team: a.model({
      userId: a.string().required(), // each team belongs to a user
      type: a.string().required(), // 'first' or 'backup'
      mantra: a.string().required(),
      members: a.hasMany("Member", "teamId"),
    }),
    WordsList: a.model({
      type: a.string().required(), // 'first' or 'backup'
      list: a.json().array(),
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
