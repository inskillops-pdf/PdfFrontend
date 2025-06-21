// DTOs for authentication
export interface UserRegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    profilePicture?: string;
    roleTypes: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface UserDTO {
    idUser: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isValidated: boolean;
    roleTypes: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    user: UserDTO;
    jwtToken: string;
}

// Error response type
export interface AuthError {
    message: string;
    code: string;
} 