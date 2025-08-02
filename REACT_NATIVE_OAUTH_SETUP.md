# React Native Google OAuth Setup Guide

## 📱 **Setup for React Native with Amplify**

### Prerequisites

- React Native CLI or Expo CLI
- Your existing Amplify backend is already configured with Google OAuth

### Step 1: Install Dependencies

```bash
# For React Native CLI
npm install aws-amplify @aws-amplify/react-native
npm install react-native-url-polyfill
npm install @react-native-async-storage/async-storage
npm install react-native-get-random-values

# For Expo
npx expo install aws-amplify @aws-amplify/react-native
npx expo install react-native-url-polyfill
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-get-random-values

# For OAuth specifically
npm install @aws-amplify/auth
```

### Step 2: Configure Amplify in React Native

Create `src/aws-exports.js` or copy your `amplify_outputs.json`:

```javascript
// src/amplifyConfig.js
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplify_outputs.json"; // Copy from your web project

Amplify.configure(amplifyconfig);
```

### Step 3: Setup App Entry Point

```javascript
// App.js or index.js
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplify_outputs.json";

Amplify.configure(amplifyconfig);

// Your app component...
```

### Step 4: Implement Google OAuth in React Native

```javascript
// src/components/AuthScreen.js
import React from "react";
import { View, Button, Alert } from "react-native";
import { Auth } from "aws-amplify";

const AuthScreen = () => {
  const signInWithGoogle = async () => {
    try {
      // For React Native, this opens the OAuth flow
      const result = await Auth.federatedSignIn({ provider: "Google" });
      console.log("Google sign in successful:", result);
    } catch (error) {
      console.error("Google sign in failed:", error);
      Alert.alert("Sign in failed", error.message);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      console.log("Sign out successful");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default AuthScreen;
```

### Step 5: Configure Deep Links

#### For React Native CLI:

**Android (android/app/src/main/AndroidManifest.xml):**

```xml
<activity
  android:name=".MainActivity"
  android:exported="true"
  android:launchMode="singleTop"
  android:theme="@style/LaunchTheme">

  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>

  <!-- Add this for OAuth callback -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="lexsee" />
  </intent-filter>
</activity>
```

**iOS (ios/YourApp/Info.plist):**

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>lexsee</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>lexsee</string>
    </array>
  </dict>
</array>
```

#### For Expo:

**app.json/app.config.js:**

```json
{
  "expo": {
    "scheme": "lexsee",
    "web": {
      "bundler": "metro"
    }
  }
}
```

---

## 🚀 **Option 2: Using Google Sign-In SDK Directly (Alternative)**

If you prefer more control, you can use Google Sign-In SDK and exchange tokens:

### Setup Google Sign-In SDK

```bash
# For React Native CLI
npm install @react-native-google-signin/google-signin

# For Expo
npx expo install expo-auth-session expo-crypto
```

### Implementation with Token Exchange

```javascript
// src/components/GoogleSignInDirect.js
import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Auth } from "aws-amplify";

GoogleSignin.configure({
  webClientId: "your-google-client-id.apps.googleusercontent.com", // From your .env
  offlineAccess: true,
});

const GoogleSignInDirect = () => {
  const signInWithGoogle = async () => {
    try {
      // Sign in with Google SDK
      const { idToken } = await GoogleSignin.signIn();

      // Exchange token with Cognito
      const cognitoUser = await Auth.federatedSignIn(
        "google",
        { token: idToken },
        { email: userInfo.email, name: userInfo.name }
      );

      console.log("Success:", cognitoUser);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <Button title="Sign in with Google SDK" onPress={signInWithGoogle} />;
};
```

---

## 🔧 **Configuration Steps**

### 1. Update Google Cloud Console

Add these redirect URIs to your Google OAuth client:

- `lexsee://callback` (or your chosen scheme)
- For Expo: `exp://localhost:19000/--/` (development)

### 2. Deploy Backend Changes

After updating the auth resource, deploy:

```bash
npx ampx sandbox
```

### 3. Copy Configuration

Copy your `amplify_outputs.json` from the web project to your React Native project.

---

## 🎯 **Recommended Approach**

**Option 1 (Amplify OAuth)** is recommended because:

- ✅ Consistent with your web implementation
- ✅ Same backend configuration
- ✅ Automatic token management
- ✅ Built-in session handling
- ✅ Works across platforms seamlessly

**Option 2 (Google SDK)** gives you more control but requires:

- ⚠️ Additional setup for each platform
- ⚠️ Manual token exchange logic
- ⚠️ More complex error handling

---

## 📋 **Quick Start Checklist**

1. ✅ Update auth resource with mobile redirect URIs
2. ✅ Deploy backend changes
3. ✅ Setup React Native project with Amplify
4. ✅ Configure deep links for your app scheme
5. ✅ Update Google Cloud Console with mobile redirect URIs
6. ✅ Copy amplify_outputs.json to React Native project
7. ✅ Test OAuth flow on device/simulator

Would you like me to help you implement any specific part of this setup?
