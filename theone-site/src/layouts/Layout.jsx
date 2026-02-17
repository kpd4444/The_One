import { Outlet } from "react-router-dom";
import ProgrammersHeader from "../components/ProgrammersHeader";
import Footer from "../components/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function Layout() {
  return (
    <>
      <ScrollToHash />
      <ProgrammersHeader />
      <Outlet />
      <Footer />
    </>
  );
}
