export const DEFAULT_SITE_URL = "https://theone412.com";

export function resolveSiteUrl() {
  const envUrl = import.meta.env.VITE_SITE_URL?.trim();
  const fallbackUrl = typeof window !== "undefined" ? window.location.origin : DEFAULT_SITE_URL;
  return (envUrl || fallbackUrl).replace(/\/$/, "");
}

