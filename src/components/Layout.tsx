import { Outlet } from "react-router";
import Navbar from "./Navbar";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
