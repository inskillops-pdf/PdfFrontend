import { Payment, ApiResponse } from '../models/types';
import { ApiService } from './api.service';

// Payment request interface matching Spring Boot DTO
export interface PaymentRequest {
    currency: string;
    quantity: number;
    name: string;
    duration: number;
    email: string;
}

// Stripe response interface matching your Spring Boot API
export interface StripeResponse {
    status: string;
    message: string;
    sessionId: string;
    sessionUrl: string;
}

export class PaymentService {
    private api: ApiService;
    private readonly baseUrl = '/api/v1/payment';

    constructor() {
        this.api = ApiService.getInstance();
    }

    /**
     * Create checkout session for course purchase
     * @param paymentRequest Payment request data
     * @param ref Course reference string
     * @returns Promise with Stripe checkout response
     */
    public async checkoutCourse(paymentRequest: PaymentRequest, ref: string): Promise<ApiResponse<StripeResponse>> {
        return this.api.post<StripeResponse>(`${this.baseUrl}/checkout?ref=${ref}`, paymentRequest);
    }

    public async createPayment(courseId: number): Promise<ApiResponse<Payment>> {
        return this.api.post<Payment>('/payments', { courseId });
    }

    public async getPaymentById(idPayment: number): Promise<ApiResponse<Payment>> {
        return this.api.get<Payment>(`/payments/${idPayment}`);
    }

    public async getPaymentByStripeSessionId(sessionId: string): Promise<ApiResponse<Payment>> {
        return this.api.get<Payment>(`/payments/stripe-session/${sessionId}`);
    }

    public async getUserPayments(): Promise<ApiResponse<Payment[]>> {
        return this.api.get<Payment[]>(`/payments/my-payments`);
    }

    public async confirmPayment(idPayment: number): Promise<ApiResponse<Payment>> {
        return this.api.put<Payment>(`/payments/${idPayment}/confirm`, {});
    }
} 