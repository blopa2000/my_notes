import { Outlet } from "react-router";
import Navbar from "./Navbar";

export const Layount = () => {
  return (
    <div>
      <Navbar />
      Layount
      <Outlet />
    </div>
  );
};
