import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Layout from "./layouts/Layout";
import {
  loadAboutPage,
  loadGalleryPage,
  loadHomePage,
  loadProductCatalogPage,
  loadSupportPage,
} from "./utils/pageLoaders";

const MainPage = lazy(loadHomePage);
const AboutPage = lazy(loadAboutPage);
const ProductsPage = lazy(loadProductCatalogPage);
const GalleryPage = lazy(loadGalleryPage);
const SupportPage = lazy(loadSupportPage);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
