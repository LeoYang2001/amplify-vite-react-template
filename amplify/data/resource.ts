import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Todo: a.model({
      content: a.string(),
    }),
    Member: a.model({
      name: a.string().required(),
      // 1. Create a reference field
      teamId: a.id(),
      // 2. Create a belongsTo relationship with the reference field
      team: a.belongsTo("Team", "teamId"),
    }),

    Team: a.model({
      mantra: a.string().required(),
      // 3. Create a hasMany relationship with the reference field
      //    from the `Member`s model.
      members: a.hasMany("Member", "teamId"),
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
