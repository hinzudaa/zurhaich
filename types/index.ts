export interface IUser {
  _id: string;
  phone: number;
  name?: string;
  email?: string;
  role: "user" | "operator" | "admin";
  provider: string;
  createdAt: string;
  deviceTokens?: string[];
}

export interface AuthResponse {
  user: IUser;
  token?: string;
}

export interface LoginBody {
  phone: string;
  password: string;
}

export interface RegisterBody {
  phone: string;
  password: string;
  name?: string;
  email?: string;
}

export type Plan = "үндсэн" | "бүрэн" | "премиум";
export type ReadingTopic =
  | "love" | "career" | "money" | "health"
  | "fate" | "family" | "travel" | "full";
export type Hand = "right" | "left";
export type Gender = "male" | "female" | "other";

export interface PalmFormData {
  firstName: string;
  name: string;
  birthDate: string;
  gender: Gender | "";
  phone: string;
  email: string;
  dominantHand: Hand | "";
  topics: ReadingTopic[];
  question: string;
  palmImageBase64: string;
  plan: Plan;
}
