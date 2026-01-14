import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="page">
      <header className="site-header">
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

      <main className="content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Slik Botanical Oils © 2025. Crafted in the night garden.</p>
      </footer>
    </div>
  );
}

export default Layout;
