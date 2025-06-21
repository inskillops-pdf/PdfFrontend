// Enum types
export enum RoleType {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum StatusPayment {
    CANCELED = 'CANCELED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export enum EnrollmentStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

// Interface definitions
export interface User {
    idUser: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone: string;
    isValidated: boolean;
    tokenToValidate?: number;
    tokenToForgotPassword?: number;
    tokenToForgotPasswordCreationDate?: string;
    validateCodeCreationDate?: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    roleTypes: RoleType;
    enrollmentList?: Enrollment[];
}

export interface Pdf {
    idPdf: number;
    title: string;
    ref: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    course?: Course;
}

export interface Payment {
    idPayment: number;
    amount: number;
    currency: string;
    description: string;
    paymentMethod: string;
    reference: string;
    transactionId: string;
    paid: boolean;
    email: string;
    stripeSessionId: string;
    statusPayment: StatusPayment;
    paidAt: string;
    createdAt: string;
    enrollment?: Enrollment;
}

export interface Enrollment {
    idEnrollment: number;
    enrolledAt: string;
    enrollmentStatus: EnrollmentStatus;
    createdAt: string;
    user?: User;
    course?: Course;
    payment?: Payment;
}

export interface Course {
    idCourse: number;
    title: string;
    ref: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    enrollmentList?: Enrollment[];
    pdfList?: Pdf[];
}

// API Response wrapper
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
    success: boolean;
} 