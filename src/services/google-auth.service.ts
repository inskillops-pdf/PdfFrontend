import { ApiService } from './api.service';
import { ApiResponse } from '../models/types';
import { config } from '../lib/config';

// Declare Google types for TypeScript
declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    prompt: () => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                };
            };
        };
    }
}

export class GoogleAuthService {
    private api: ApiService;
    private readonly url: string;
    private readonly googleClientId: string;
    private readonly googleUrl: string;

    constructor() {
        this.api = ApiService.getInstance();
        this.url = `${config.apiUrl}/api/v1/auth/loginGoogle`;
        this.googleClientId = config.google.clientId;
        this.googleUrl = config.google.redirectUri;
    }

    /**
     * Initialize Google Sign-In
     */
    public loadGoogleAuth(): void {
        if (typeof window !== 'undefined' && window.google) {
            window.google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: (response: any) => this.handleGoogleLogin(response),
            });

            window.google.accounts.id.prompt();
        } else {
            console.error('Google Sign-In not available');
        }
    }

    /**
     * Render Google Sign-In button
     * @param elementId The ID of the element to render the button in
     */
    public renderGoogleButton(elementId: string): void {
        if (typeof window !== 'undefined' && window.google) {
            const element = document.getElementById(elementId);
            if (element) {
                window.google.accounts.id.renderButton(element, {
                    theme: 'outline',
                    size: 'large',
                    type: 'standard',
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                });
            }
        }
    }

    /**
     * Handle Google login response
     * @param response Google Sign-In response
     */
    private async handleGoogleLogin(response: any): Promise<void> {
        try {
            console.log('Google Login Response:', response);
            
            const result = await this.api.post<any>(this.url, { 
                token: response.credential 
            });

            if (result.success && result.data) {
                console.log('Login Successful:', result.data);
                
                // Store the JWT token
                localStorage.setItem('token', result.data.jwtToken);
                
                // Store user data
                localStorage.setItem('user', JSON.stringify(result.data.user));
                
                // Navigate to home page or dashboard
                window.location.href = '/dashboard';
            } else {
                console.error('Login failed:', result.message);
                throw new Error(result.message || 'Google login failed');
            }
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    }

    /**
     * Check if Google Sign-In is available
     * @returns boolean indicating if Google Sign-In is available
     */
    public isGoogleAvailable(): boolean {
        return typeof window !== 'undefined' && !!window.google?.accounts?.id;
    }

    /**
     * Get Google Client ID
     * @returns The Google Client ID
     */
    public getGoogleClientId(): string {
        return this.googleClientId;
    }
} 