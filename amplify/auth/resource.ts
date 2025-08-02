import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

// For production deployment, Amplify Gen2 requires secrets to be set properly
// This configuration works with environment variables set in Amplify Console
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
