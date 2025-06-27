# Google Authentication Setup

This document explains how to set up and use the Google Authentication service in your AI Professionals University application.

## Prerequisites

1. A Google Cloud Console project
2. Google Sign-In API enabled
3. OAuth 2.0 credentials configured

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sign-In API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Add your domain to authorized origins
6. Copy the Client ID for use in your application

### 2. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8085
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

### 3. Backend API Endpoint

Ensure your backend has the following endpoint:

```
POST /api/v1/auth/loginGoogle
Content-Type: application/json

{
  "token": "google_id_token_here"
}
```

Expected response:

```json
{
  "success": true,
  "data": {
    "jwtToken": "your_jwt_token",
    "user": {
      "idUser": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@gmail.com",
      "roleTypes": "STUDENT"
    }
  }
}
```

## Usage

### 1. Using the GoogleAuthService directly

```javascript
import { GoogleAuthService } from "../services/google-auth.service";

const googleAuth = new GoogleAuthService();

// Initialize Google Sign-In
googleAuth.loadGoogleAuth();

// Or render a button
googleAuth.renderGoogleButton("google-signin-button");
```

### 2. Using the GoogleSignIn component

```javascript
import GoogleSignIn from "../components/GoogleSignIn";

function LoginPage() {
  const handleGoogleSuccess = (userData) => {
    console.log("Google login successful:", userData);
    // Handle successful login
  };

  const handleGoogleError = (error) => {
    console.error("Google login failed:", error);
    // Handle error
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleSignIn
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
}
```

### 3. Integration with existing login page

Add the Google Sign-In component to your existing login page:

```javascript
// In your login.js page
import GoogleSignIn from "../components/GoogleSignIn";

// Add this inside your form, after the regular login form
<div className="mb-6">
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-white text-gray-500">Or continue with</span>
    </div>
  </div>

  <div className="mt-6">
    <GoogleSignIn
      onSuccess={() => router.push("/dashboard")}
      onError={(error) => setError(error.message)}
    />
  </div>
</div>;
```

## Files Created

1. `src/services/google-auth.service.ts` - Main Google authentication service
2. `src/lib/config.ts` - Configuration management
3. `src/components/GoogleSignIn.js` - React component for Google Sign-In
4. `GOOGLE_AUTH_SETUP.md` - This documentation file

## Features

- ✅ Google Sign-In integration
- ✅ JWT token handling
- ✅ User data storage
- ✅ Error handling
- ✅ TypeScript support
- ✅ React component
- ✅ Environment variable configuration
- ✅ Backward compatibility with existing code

## Security Notes

1. Always validate the Google ID token on your backend
2. Use HTTPS in production
3. Keep your Google Client ID secure
4. Implement proper session management
5. Add rate limiting to your authentication endpoints

## Troubleshooting

### Common Issues

1. **"Google Sign-In not available"**

   - Check if the Google script is loaded
   - Verify your Google Client ID is correct
   - Ensure you're on an authorized domain

2. **"Login failed"**

   - Check your backend API endpoint
   - Verify the token format being sent
   - Check server logs for detailed error messages

3. **Button not rendering**
   - Ensure the element ID exists in the DOM
   - Check if the Google script loaded successfully
   - Verify your Google Client ID is set

### Debug Mode

Enable debug logging by adding this to your browser console:

```javascript
localStorage.setItem("debug", "google-auth");
```

This will show detailed logs about the authentication process.
