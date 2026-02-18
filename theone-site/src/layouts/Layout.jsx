import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <ScrollToHash />
      <SiteHeader />
      <div
        key={`${location.pathname}${location.search}${location.hash}`}
        className="route-transition"
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
