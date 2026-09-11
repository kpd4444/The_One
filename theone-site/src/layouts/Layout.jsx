import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import ScrollManager from "../components/ScrollToHash";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollManager />
      <SiteHeader />
      <div key={pathname} className="route-transition">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
