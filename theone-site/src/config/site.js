export const DEFAULT_SITE_URL = "https://theone412.com";

export function resolveSiteUrl() {
  const envUrl = import.meta.env.VITE_SITE_URL?.trim();
  return (envUrl || DEFAULT_SITE_URL).replace(/\/$/, "");
}

export function isProductionHost() {
  if (typeof window === "undefined") return true;
  return ["theone412.com", "www.theone412.com"].includes(
    window.location.hostname,
  );
}
