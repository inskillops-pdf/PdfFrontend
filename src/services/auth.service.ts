import { ApiService } from './api.service';
import {
    UserRegisterDTO,
    LoginRequestDTO,
    UserDTO,
    AuthError
} from '../models/auth.types';
import { ApiResponse } from '../models/types';

export class AuthService {
    private api: ApiService;
    private readonly baseUrl = '/api/v1/auth';

    constructor() {
        this.api = ApiService.getInstance();
    }

    /**
     * Register a new user account
     * @param userData User registration data
     * @returns Promise with the created user data
     */
    public async register(userData: UserRegisterDTO): Promise<ApiResponse<UserDTO>> {
        try {
            const response = await this.api.post<UserDTO>(`${this.baseUrl}/user/registerUser`, userData);
            
            if (response.success && response.data) {
                // Store user data after successful registration
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            
            return response;
        } catch (error) {
            // Handle registration errors
            if (error.message?.includes('email already exists')) {
                throw new Error('An account with this email already exists');
            }
            if (error.message?.includes('Invalid email')) {
                throw new Error('Please enter a valid email address');
            }
            if (error.message?.includes('Empty firstName')) {
                throw new Error('First name is required');
            }
            if (error.message?.includes('Empty lastName')) {
                throw new Error('Last name is required');
            }
            if (error.message?.includes('password is NULL')) {
                throw new Error('Password is required');
            }
            if (error.message?.includes('roleType is NULL')) {
                throw new Error('Role type is required');
            }
            
            throw error;
        }
    }

    /**
     * Login user with email and password
     * @param loginData Login credentials
     * @returns Promise with JWT token and user info
     */
    public async login(loginData: LoginRequestDTO): Promise<ApiResponse<any>> {
        try {
            const response = await this.api.post<any>(`${this.baseUrl}/token`, loginData);
            
            if (response.success && response.data?.jwtToken) {
                // Store the JWT token
                localStorage.setItem('token', response.data.jwtToken);
                // Store user data
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response;
        } catch (error) {
            // Handle authentication error
            const authError = error as AuthError;
            if (authError.code === 'BAD_LOGIN_CREDENTIALS') {
                throw new Error('Invalid email or password');
            }
            throw error;
        }
    }

    /**
     * Logout the current user
     */
    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // You might want to navigate to login page or home page here
    }

    /**
     * Get the current authenticated user's JWT token
     * @returns The JWT token or null if not authenticated
     */
    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Get the current authenticated user's information
     * @returns The user information or null if not authenticated
     */
    public getCurrentUser(): any | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    /**
     * Check if user is authenticated
     * @returns boolean indicating if user is authenticated
     */
    public isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return token !== null && user !== null;
    }
} 