export interface IUser {
  _id: string;
  phone: number;
  name?: string;
  firstName?: string;
  email?: string;
  birthDate?: string;
  gender?: "male" | "female" | "other";
  role: "user" | "operator" | "admin";
  provider: string;
  createdAt: string;
  deviceTokens?: string[];
}

export interface AuthResponse {
  user: IUser;
  token?: string;
}

export interface RegisterType {
  phone: string;
  password: string;
  name?: string;
  firstName?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
}

export interface LoginType {
  phone: string;
  password: string;
}
