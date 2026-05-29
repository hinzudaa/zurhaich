"use client";

import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { login, logout, me, register } from "@/apis/auth";
import type { AuthResponse, IUser, LoginType, RegisterType } from "@/types/auth";

export const ME_KEY = "/auth/me";

export function useMe() {
  return useSWR<IUser>(ME_KEY, me, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
}

export function useLogin() {
  return useSWRMutation<AuthResponse, Error, string, LoginType>(
    ME_KEY,
    async (_key, { arg }) => {
      const result = await login(arg);
      await mutate(ME_KEY);
      return result;
    },
  );
}

export function useRegister() {
  return useSWRMutation<AuthResponse, Error, string, RegisterType>(
    ME_KEY,
    async (_key, { arg }) => {
      const result = await register(arg);
      await mutate(ME_KEY);
      return result;
    },
  );
}

export function useLogout() {
  return useSWRMutation<void, Error>(ME_KEY, async () => {
    await logout();
    try { ["_rs", "_rf", "_rp"].forEach((k) => sessionStorage.removeItem(k)); } catch {}
    await mutate(ME_KEY, undefined, { revalidate: false });
  });
}
