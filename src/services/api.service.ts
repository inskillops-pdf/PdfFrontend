import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '../models/types';

export class ApiService {
    private static instance: ApiService;
    private api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor
        this.api.interceptors.request.use(
            (config) => {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                if (token && config.headers) {
                    // Add Bearer prefix for JWT token
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private handleResponse<T>(response: AxiosResponse): ApiResponse<T> {
        return {
            data: response.data.data || response.data,
            message: response.data.message || 'Success',
            status: response.status,
            success: response.status >= 200 && response.status < 300
        };
    }

    private handleError(error: any): ApiResponse<any> {
        if (error.response?.status === 401) {
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login page if needed
            window.location.href = '/login';
        }
        
        return {
            data: null,
            message: error.response?.data?.message || 'An error occurred',
            status: error.response?.status || 500,
            success: false
        };
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.get<T>(url, config);
            return this.handleResponse<T>(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.post<T>(url, data, config);
            return this.handleResponse<T>(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.put<T>(url, data, config);
            return this.handleResponse<T>(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.delete<T>(url, config);
            return this.handleResponse<T>(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }
} 