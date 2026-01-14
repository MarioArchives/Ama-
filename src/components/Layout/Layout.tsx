import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="page">
      <Header />

      <main className="content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Slik Botanical Oils © 2025. Crafted in the night garden.</p>
      </footer>
    </div>
  );
};
