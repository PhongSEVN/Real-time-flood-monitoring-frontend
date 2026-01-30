import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";

const SIDEBAR_WIDTH = 240;

export default function DefaultLayout() {
  return (
    <>
      <Menu />
      <div
        className="min-h-screen bg-(--color-surface)"
        style={{ marginLeft: `${SIDEBAR_WIDTH}px` }}
      >
        <Header />
        <main className="px-4 pb-6 pt-4 md:px-6">
          <Outlet />
        </main>
        <div className="px-4 pb-6 md:px-6">
          <Footer />
        </div>
      </div>
    </>
  );
}
