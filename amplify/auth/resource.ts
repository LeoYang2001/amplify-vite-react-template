import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 * 
 * TEMPORARY: OAuth disabled for production deployment
 * This is due to current Amplify Gen2 secret management limitations
 * OAuth works perfectly in sandbox mode via: npx ampx sandbox
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // OAuth temporarily disabled for production deployment
    // Will be re-enabled when Amplify Gen2 secret management improves
    // 
    // externalProviders: {
    //   google: {
    //     clientId: secret("GOOGLE_CLIENT_ID"),
    //     clientSecret: secret("GOOGLE_CLIENT_SECRET"),
    //     scopes: ["email", "openid", "profile"],
    //   },
    //   callbackUrls: [
    //     "http://localhost:5173",
    //     "http://localhost:5174",
    //     "myapp://callback",
    //     "lexsee://callback",
    //     "https://d1h1j924lgaa6v.amplifyapp.com"
    //   ],
    //   logoutUrls: [
    //     "http://localhost:5173", 
    //     "http://localhost:5174",
    //     "myapp://signout",
    //     "lexsee://signout",
    //     "https://d1h1j924lgaa6v.amplifyapp.com"
    //   ],
    // },
  },
});
