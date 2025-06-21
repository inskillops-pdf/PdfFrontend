import { Enrollment, ApiResponse } from '../models/types';
import { ApiService } from './api.service';

export class EnrollmentService {
    private api: ApiService;
    private readonly baseUrl = '/api/v1/payment';

    constructor() {
        this.api = ApiService.getInstance();
    }

    /**
     * Get all enrollments for the current user in session
     * @returns Promise with list of user enrollments
     */
    public async getAllEnrollmentsByUserInSession(): Promise<ApiResponse<Enrollment[]>> {
        return this.api.get<Enrollment[]>(`${this.baseUrl}/getAllEnrollmentsByUserInSesson`);
    }
} 