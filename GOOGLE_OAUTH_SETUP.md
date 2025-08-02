# Google OAuth Setup Guide

## Prerequisites

1. Google Cloud Console account
2. Project with enabled Google+ API or Google Identity API

## Steps to Configure Google OAuth

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client IDs"
5. Choose "Web application" as the application type
6. Configure the OAuth consent screen if prompted
7. Add authorized redirect URIs:
   - For local development: `http://localhost:5173`
   - For production: your deployed app URL
8. Copy the Client ID and Client Secret

### 2. Set Environment Variables

#### For Local Development:

Update the `.env` file with your Google OAuth credentials:

```
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

#### For Production (Amplify Console):

1. Go to your Amplify app in the AWS Console
2. Navigate to "Environment variables"
3. Add the following secrets:
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret

### 3. Deploy the Backend

Run the following command to deploy your updated auth configuration:

```bash
npx ampx sandbox
```

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to your app
3. You should see both email login and "Continue with Google" options
4. Test both authentication methods

## Notes

- Make sure your Google OAuth app is set to "Published" status in the Google Cloud Console
- Add your production domain to the authorized redirect URIs when deploying
- The callback URLs in the auth resource should match your actual domains

## Troubleshooting

If you encounter issues:

1. Check that your Google OAuth credentials are correctly set
2. Verify that the redirect URIs match exactly
3. Ensure your Google Cloud project has the necessary APIs enabled
4. Check the browser console for any OAuth-related errors
