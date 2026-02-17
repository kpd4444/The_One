import { Outlet } from "react-router-dom";
import CompanyHeader from "../components/CompanyHeader";
import Footer from "../components/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function Layout() {
  return (
    <>
      <ScrollToHash />
      <CompanyHeader />
      <Outlet />
      <Footer />
    </>
  );
}
