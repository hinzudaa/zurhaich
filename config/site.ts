export const siteConfig = {
  name: "Зурхайч",
  description: "Зурхайч",
};

// export const siteUrl = "http://localhost:3333";
export const siteUrl = "https://palm.zuraach.site";

export const fetcher = (url: string) =>
  fetch(siteUrl + url).then((res) => res.json());

export type SiteConfig = typeof siteConfig;
