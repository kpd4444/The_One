export const loadMainPage = () => import("../pages/MainPage");
export const loadAboutPage = () => import("../pages/AboutPage");
export const loadProductsPage = () => import("../pages/ProductsPage");
export const loadGalleryPage = () => import("../pages/GalleryPage");
export const loadSupportPage = () => import("../pages/SupportPage");

const pagePreloaders = {
  "/": loadMainPage,
  "/about": loadAboutPage,
  "/products": loadProductsPage,
  "/gallery": loadGalleryPage,
  "/support": loadSupportPage,
};

export function preloadPage(href) {
  if (!href) return;

  const normalizedPath = href.split("#")[0].split("?")[0] || "/";
  const loader = pagePreloaders[normalizedPath];

  if (loader) {
    loader();
  }
}
