export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  user: {
    id: number;
    email: string;
  };
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
