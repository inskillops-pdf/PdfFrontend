import { Course, ApiResponse } from '../models/types';
import { ApiService } from './api.service';

export class CourseService {
    private api: ApiService;
    private readonly baseUrl = '/courses';

    constructor() {
        this.api = ApiService.getInstance();
    }

    public async getAllCourses(): Promise<ApiResponse<Course[]>> {
        return this.api.get<Course[]>(this.baseUrl);
    }

    public async getCourseById(idCourse: number): Promise<ApiResponse<Course>> {
        return this.api.get<Course>(`${this.baseUrl}/${idCourse}`);
    }

    public async getCourseWithPdfs(idCourse: number): Promise<ApiResponse<Course>> {
        return this.api.get<Course>(`${this.baseUrl}/${idCourse}/pdfs`);
    }

    public async getCourseWithEnrollments(idCourse: number): Promise<ApiResponse<Course>> {
        return this.api.get<Course>(`${this.baseUrl}/${idCourse}/enrollments`);
    }
} 