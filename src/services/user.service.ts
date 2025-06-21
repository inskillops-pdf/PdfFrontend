import { User, ApiResponse } from '../models/types';
import { ApiService } from './api.service';

export class UserService {
    private api: ApiService;
    private readonly baseUrl = '/users';

    constructor() {
        this.api = ApiService.getInstance();
    }

    public async getCurrentUser(): Promise<ApiResponse<User>> {
        return this.api.get<User>(`${this.baseUrl}/me`);
    }

    public async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
        return this.api.put<User>(`${this.baseUrl}/profile`, userData);
    }

    public async validateAccount(token: number): Promise<ApiResponse<void>> {
        return this.api.post<void>(`${this.baseUrl}/validate`, { token });
    }

    public async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
        return this.api.post<void>(`${this.baseUrl}/forgot-password`, { email });
    }

    public async resetPassword(token: number, newPassword: string): Promise<ApiResponse<void>> {
        return this.api.post<void>(`${this.baseUrl}/reset-password`, { token, newPassword });
    }

    public async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<void>> {
        return this.api.put<void>(`${this.baseUrl}/change-password`, { oldPassword, newPassword });
    }

    public async getUserEnrollments(): Promise<ApiResponse<User>> {
        return this.api.get<User>(`${this.baseUrl}/me/enrollments`);
    }

    public async getAllUsers(): Promise<ApiResponse<User[]>> {
        return this.api.get<User[]>(this.baseUrl);
    }

    public async getUserById(id: number): Promise<ApiResponse<User>> {
        return this.api.get<User>(`${this.baseUrl}/${id}`);
    }
} 