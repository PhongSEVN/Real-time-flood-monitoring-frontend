import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";

export default function DefaultLayout() {
  return (
    <>
      <div>
        <div>
          <Menu />
        </div>
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}
