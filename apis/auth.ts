import { siteUrl } from "@/config/site";
import { HttpRequest, tokenStore } from "@/utils/request";
import type { AuthResponse, IUser, LoginType, RegisterType } from "@/types/auth";

const networkHttp = new HttpRequest(null, `${siteUrl}/auth`);

const saveToken = (res: AuthResponse) => {
  if (res.token) tokenStore.set(res.token);
  return res;
};

export const register = (data: RegisterType): Promise<AuthResponse> =>
  networkHttp.post("/register", data as unknown as Record<string, unknown>).then(saveToken);

export const login = (data: LoginType): Promise<AuthResponse> =>
  networkHttp.post("/login", data as unknown as Record<string, unknown>).then(saveToken);

export const me = (): Promise<IUser> => networkHttp.get("/me");

export const logout = (): Promise<void> =>
  networkHttp.post("/logout").finally(() => tokenStore.clear());
