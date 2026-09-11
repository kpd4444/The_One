export const loadHomePage = () => import("../pages/HomePage");
export const loadAboutPage = () => import("../pages/AboutPage");
export const loadProductCatalogPage = () =>
  import("../pages/ProductCatalogPage");
export const loadGalleryPage = () => import("../pages/GalleryPage");
export const loadCustomerSupportPage = () =>
  import("../pages/CustomerSupportPage");

const pagePreloaders = {
  "/": loadHomePage,
  "/about": loadAboutPage,
  "/products": loadProductCatalogPage,
  "/gallery": loadGalleryPage,
  "/support": loadCustomerSupportPage,
};

export function preloadPage(href) {
  if (!href) return;
  const normalizedPath = href.split("#")[0].split("?")[0] || "/";
  pagePreloaders[normalizedPath]?.();
}
