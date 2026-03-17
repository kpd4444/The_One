import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

const MainPage = lazy(() => import("./pages/MainPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));

export default function App() {
  return (
    <Suspense fallback={<div className="page-loading">페이지를 불러오는 중입니다.</div>}>
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
