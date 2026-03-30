import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToHash />
      <SiteHeader />
      <div key={pathname} className="route-transition">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
