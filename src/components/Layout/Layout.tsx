import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import "./Layout.css";

export const Layout = () => {
    return (
        <>
            <Header />
            <div className="page">

                <main className="content">
                    <Outlet />
                </main>

                <footer className="site-footer">
                    <p>Ama © 2025. Amazon grown, British made.</p>
                </footer>
            </div>
        </>
    );
};
