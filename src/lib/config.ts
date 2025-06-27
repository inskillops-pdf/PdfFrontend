export interface AppConfig {
    apiUrl: string;
    google: {
        clientId: string;
        redirectUri: string;
    };
    github: {
        clientId: string;
        redirectUri: string;
    };
}

export const config: AppConfig = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085',
    google: {
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '607272665977-e54aru4e5mdaltd7445n7f7oqkn2k5mp.apps.googleusercontent.com',
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
    },
    github: {
        clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'Ov23liQkQ0Dsw1YuE2jG',
        redirectUri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || 'http://localhost:3000',
    },
};

// Legacy credential object for backward compatibility
export const Credential = {
    client_id_Google: config.google.clientId,
    redirect_uri_Google: config.google.redirectUri,
    client_id_Github: config.github.clientId,
    redirect_uri_Github: config.github.redirectUri,
};

// Environment object for backward compatibility
export const environment = {
    apiUrl: config.apiUrl,
}; 