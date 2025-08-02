import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || secret("GOOGLE_CLIENT_ID"),
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["email", "openid", "profile"],
      },
      callbackUrls: [
        "http://localhost:5173",
        "http://localhost:5174",
        // Mobile deep link URLs
        "myapp://callback",
        "lexsee://callback",
        // Add your production URL here when deploying
        // 'https://your-domain.com'
      ],
      logoutUrls: [
        "http://localhost:5173",
        "http://localhost:5174",
        // Mobile deep link URLs
        "myapp://signout",
        "lexsee://signout",
        // Add your production URL here when deploying
        // 'https://your-domain.com'
      ],
    },
  },
});
