import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="brand">
        <span className="brand-mark">Slik</span>
        <span className="brand-sub">Botanical Oils</span>
      </div>
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          About
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Our Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Contact Us
        </NavLink>
      </nav>
    </header>
  );
};
