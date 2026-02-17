import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="logo-img" />
        </Link>

        <nav className="nav-menu">
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>회사소개</NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>제품소개</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>갤러리</NavLink>
          <NavLink to="/support" className={({ isActive }) => (isActive ? "active" : "")}>고객센터</NavLink>
        </nav>

        <Link className="btn btn-outline" to="/#contact">상담 신청</Link>
      </div>
    </header>
  );
}
