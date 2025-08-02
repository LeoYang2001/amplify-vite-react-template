#!/usr/bin/env node

/**
 * Script to set up secrets for Amplify Gen2 production deployment
 * This script runs during the build process to ensure secrets are available
 */

const { SSMClient, PutParameterCommand } = require('@aws-sdk/client-ssm');

async function setupSecrets() {
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-2';
  const appId = process.env.AWS_APP_ID;
  
  if (!appId) {
    console.log('No AWS_APP_ID found, skipping secret setup');
    return;
  }

  const ssmClient = new SSMClient({ region });

  const secrets = [
    {
      name: `GOOGLE_CLIENT_ID`,
      value: process.env.GOOGLE_CLIENT_ID
    },
    {
      name: `GOOGLE_CLIENT_SECRET`,
      value: process.env.GOOGLE_CLIENT_SECRET
    }
  ];

  for (const secret of secrets) {
    if (!secret.value) {
      console.error(`Missing environment variable: ${secret.name}`);
      process.exit(1);
    }

    try {
      const command = new PutParameterCommand({
        Name: secret.name,
        Value: secret.value,
        Type: 'SecureString',
        Overwrite: true
      });

      await ssmClient.send(command);
      console.log(`✅ Set secret: ${secret.name}`);
    } catch (error) {
      console.error(`❌ Failed to set secret ${secret.name}:`, error.message);
      process.exit(1);
    }
  }

  console.log('🎉 All secrets set successfully!');
}

setupSecrets().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
