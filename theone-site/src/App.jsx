import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Layout from "./layouts/Layout";
import {
  loadAboutPage,
  loadGalleryPage,
  loadHomePage,
  loadProductCatalogPage,
  loadCustomerSupportPage,
} from "./utils/routeLoaders";

const HomePage = lazy(loadHomePage);
const AboutPage = lazy(loadAboutPage);
const ProductCatalogPage = lazy(loadProductCatalogPage);
const GalleryPage = lazy(loadGalleryPage);
const CustomerSupportPage = lazy(loadCustomerSupportPage);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductCatalogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/support" element={<CustomerSupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
