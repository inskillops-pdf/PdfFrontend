import { Pdf, ApiResponse } from '../models/types';
import { ApiService } from './api.service';

export class PdfService {
    private api: ApiService;
    private readonly baseUrl = '/pdfs';

    constructor() {
        this.api = ApiService.getInstance();
    }

    public async getPdfById(idPdf: number): Promise<ApiResponse<Pdf>> {
        return this.api.get<Pdf>(`${this.baseUrl}/${idPdf}`);
    }

    public async getPdfsByCourse(courseId: number): Promise<ApiResponse<Pdf[]>> {
        return this.api.get<Pdf[]>(`${this.baseUrl}/course/${courseId}`);
    }

    public async downloadPdf(idPdf: number): Promise<Blob> {
        const response = await this.api.get<Blob>(`${this.baseUrl}/${idPdf}/download`, {
            responseType: 'blob'
        });
        return response.data;
    }
} 