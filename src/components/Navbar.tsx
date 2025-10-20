import { useEffect, useRef, useState } from "react";
import { Menu, User, Settings, LogOut } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Notes</h1>

      <div className="navbar-container" ref={menuRef}>
        <button className="navbar-button" onClick={() => setOpen((prev: boolean) => !prev)}>
          <Menu size={30} />
        </button>

        <div className={`navbar-dropdown ${open ? "show" : ""}`}>
          <button className="navbar-item">
            <User /> <h2>Profile</h2>
          </button>
          <button className="navbar-item">
            <Settings /> <h2>Settings</h2>
          </button>
          <button className="navbar-item logout">
            <LogOut /> <h2>Logout</h2>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
