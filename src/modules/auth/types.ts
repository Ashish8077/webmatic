export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    role: string;
  };
}
