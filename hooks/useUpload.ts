"use client";

import useSWRMutation from "swr/mutation";
import { uploadImageFn } from "@/apis/upload";

export function useUploadImage() {
  return useSWRMutation<{ url: string }, Error, string, File>(
    "/upload",
    (_key, { arg }) => uploadImageFn(arg),
  );
}
