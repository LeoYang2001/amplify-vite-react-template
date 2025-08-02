# Temporary Solution for Google OAuth in Production

Due to Amplify Gen2 limitations with secret management in production environments, here's a temporary workaround:

## Option 1: Use Non-Secret Configuration (Temporary)

For testing purposes, you can use a non-secret configuration. Note that this is not recommended for production but can help us verify the OAuth flow works:

```typescript
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: "YOUR_GOOGLE_CLIENT_ID",
        clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
        scopes: ["email", "openid", "profile"],
      },
      // ... rest of config
    },
  },
});
```

## Option 2: Use AWS CLI to Set Secrets at Deployment Time

Add to your amplify.yml:

```yaml
backend:
  phases:
    build:
      commands:
        - npm ci --cache .npm --prefer-offline
        - aws ssm put-parameter --name "GOOGLE_CLIENT_ID" --value "$GOOGLE_CLIENT_ID" --type "SecureString" --overwrite
        - aws ssm put-parameter --name "GOOGLE_CLIENT_SECRET" --value "$GOOGLE_CLIENT_SECRET" --type "SecureString" --overwrite
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
```

## Option 3: Use Environment Variables with Custom Backend

Create a custom backend configuration that reads environment variables.

## Current Status

- ✅ Local development works with secrets
- ❌ Production deployment failing due to secret management
- ✅ Google Cloud Console configured
- ✅ OAuth URLs configured for both web and mobile

## Next Steps

1. Implement Option 1 for immediate testing
2. Verify OAuth flow works in production
3. Implement proper secret management solution
4. Test on both web and React Native platforms

## Production URL

Your app will be available at: `https://d1h1j924lgaa6v.amplifyapp.com`

## Google Cloud Console Update

Once the app deploys successfully, add these URLs to Google Cloud Console:
- `https://d1h1j924lgaa6v.amplifyapp.com`
- Cognito domain URLs (will be available in amplify_outputs.json after deployment)
