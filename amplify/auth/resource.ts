import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 *
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["email", "openid", "profile"],
      },
      callbackUrls: [
        "myapp://", // Your custom scheme
      ],
      logoutUrls: ["myapp://"],
    },
  },
  userAttributes: {
    email: {
      required: false, // Make email optional for external providers
    },
  },
});
