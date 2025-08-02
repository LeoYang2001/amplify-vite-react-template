# Production Deployment with Google OAuth

## Issue: Secrets Not Found in Production

When deploying to production through Amplify hosting, secrets set via `npx ampx sandbox secret set` are only available in the sandbox environment, not in production deployments.

## Solution: Set Secrets in AWS Amplify Console

### Step 1: Access AWS Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Find your app: `lexsee-v3` (App ID: d2s3xhpktei77o)
3. Navigate to the app details

### Step 2: Set Environment Variables

1. In your Amplify app, go to **Hosting** > **Environment variables**
2. Add the following environment variables:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

### Step 3: Alternative - Use AWS Systems Manager Parameter Store

Since Amplify Gen2 uses the `secret()` function, you can also set secrets in AWS Systems Manager:

1. Go to [AWS Systems Manager Console](https://console.aws.amazon.com/systems-manager/)
2. Navigate to **Parameter Store**
3. Create parameters:
   - Name: `/amplify/d2s3xhpktei77o/GOOGLE_CLIENT_ID`
   - Type: `SecureString`
   - Value: Your Google OAuth client ID
   
   - Name: `/amplify/d2s3xhpktei77o/GOOGLE_CLIENT_SECRET`
   - Type: `SecureString`
   - Value: Your Google OAuth client secret

### Step 4: Redeploy

After setting the secrets/environment variables:

1. Go back to your Amplify app
2. Trigger a new deployment by pushing to your connected branch, or
3. Manually trigger a redeploy from the Amplify Console

## Current Status

- ✅ Local development working with sandbox secrets
- ❌ Production deployment failing due to missing secrets
- ✅ Google OAuth configuration properly set up
- ✅ Callback URLs configured for both web and mobile

## Next Steps

1. Set secrets in AWS Amplify Console (environment variables)
2. Redeploy the application
3. Update Google Cloud Console with production URLs
4. Test Google login in production

## Google Cloud Console Updates Needed

Once your production URL is available, update Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Edit your OAuth client
4. Add production URLs to **Authorized redirect URIs**:
   - `https://your-production-domain.com`
   - Your Cognito domain callback URL (will be available after deployment)

## Troubleshooting

### If secrets still don't work:
1. Check AWS CloudFormation logs
2. Verify parameter names match exactly
3. Ensure AWS region is correct
4. Check IAM permissions for Amplify service role

### Getting your Cognito domain:
After successful deployment, check `amplify_outputs.json` for the `oauth.domain` value, or find it in the AWS Cognito Console.
