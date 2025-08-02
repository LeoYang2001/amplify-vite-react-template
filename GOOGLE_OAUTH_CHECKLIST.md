# Google OAuth Configuration Checklist

## ✅ Completed Steps:

1. ✅ Google OAuth credentials added to .env file
2. ✅ Amplify secrets configured (`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`)
3. ✅ Auth resource updated with Google provider
4. ✅ Frontend configured with social providers
5. ✅ Deployment in progress...

## 🔧 Google Cloud Console Verification Needed:

Please verify in your Google Cloud Console that your OAuth client has these redirect URIs:

### For Development:

- `http://localhost:5173`

### For Production (when you deploy):

- Your production domain (e.g., `https://your-app.amplifyapp.com`)

## 📋 Steps to verify/update in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Find your OAuth 2.0 Client ID: `676159552554-pumv1gt2tk2tj24da633670roh4u511v.apps.googleusercontent.com`
4. Click "Edit" (pencil icon)
5. Under "Authorized redirect URIs", ensure you have:
   - `http://localhost:5173` (for local development)
   - Add your production URL when you deploy to Amplify

## 🚀 Testing Steps (after deployment completes):

1. Run `npm run dev` to start your development server
2. Navigate to `http://localhost:5173`
3. You should see both:
   - Email/password sign-in form
   - "Continue with Google" button
4. Test both authentication methods

## 🔍 Troubleshooting:

If Google login doesn't work:

- Check browser console for OAuth errors
- Verify redirect URIs match exactly (including protocol and port)
- Ensure your Google OAuth app is published (not in testing mode)
- Check that the correct scopes are configured: `email`, `openid`, `profile`
