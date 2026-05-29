"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Ctx = { ready: boolean; markReady: () => void };
export const PageLoaderCtx = createContext<Ctx>({ ready: false, markReady: () => {} });

export function PageLoaderProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  return (
    <PageLoaderCtx.Provider value={{ ready, markReady }}>
      {children}
    </PageLoaderCtx.Provider>
  );
}

export function usePageReady(isReady: boolean) {
  const { markReady } = useContext(PageLoaderCtx);
  useEffect(() => {
    if (isReady) markReady();
  }, [isReady, markReady]);
}
