import { siteUrl } from "@/config/site";
import { tokenStore } from "@/utils/request";

export const uploadImageFn = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {};
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${siteUrl}/upload`, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? "Зураг оруулахад алдаа гарлаа");
  return json.data as { url: string };
};
