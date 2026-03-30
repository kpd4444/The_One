import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Layout from "./layouts/Layout";
import {
  loadAboutPage,
  loadGalleryPage,
  loadMainPage,
  loadProductsPage,
  loadSupportPage,
} from "./utils/pageLoaders";

const MainPage = lazy(loadMainPage);
const AboutPage = lazy(loadAboutPage);
const ProductsPage = lazy(loadProductsPage);
const GalleryPage = lazy(loadGalleryPage);
const SupportPage = lazy(loadSupportPage);

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
        </Route>
      </Routes>
    </Suspense>
  );
}
