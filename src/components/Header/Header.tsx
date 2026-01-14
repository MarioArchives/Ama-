import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const updateScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        updateScroll();
        window.addEventListener("scroll", updateScroll, { passive: true });
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    return (
        <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
            <div className="brand">
                <div className="brand-mark-holder">
                    <span className="brand-mark">Ama</span><span className="brand-mark-b">zonas</span>
                </div>
                <span className="brand-sub">Amazonian cosmetics</span>
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
