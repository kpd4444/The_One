import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import GalleryPage from "./pages/GalleryPage";
import SupportPage from "./pages/SupportPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>
    </Routes>
  );
}
