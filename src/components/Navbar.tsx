import { useEffect, useRef, useState } from "react";
import { Menu, User, LogOut, Sun, Moon } from "lucide-react";
import { authService } from "../services/authService";
import "../styles/navbar.css";
import { useAuth } from "../context/auth/AuthContext";
import { Link } from "react-router";
import { useNotes } from "../context/notes/NotesContext";
import ModalProfile from "./ModalProfile";

const Navbar = () => {
  const { setLoading, cleanState } = useAuth();
  const { setNotes } = useNotes();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    // cargar tema guardado o por defecto oscuro
    return (localStorage.getItem("theme") as "dark" | "light") || "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = async () => {
    try {
      await authService.signOutRequest();
      cleanState();
      setNotes();
      setLoading(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleModalProfile = () => {
    setShowModal((pre) => !pre);
    setOpen(false);
  };

  //Aplicar tema al cargar o al cambiar
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
    <>
      {showModal && <ModalProfile toggleModalProfile={toggleModalProfile} />}
      <nav className="navbar">
        <Link to="/dashboard" className="navbar-title-link">
          <h1 className="navbar-title">My Notes</h1>
        </Link>
        <div className="navbar-container" ref={menuRef}>
          <button
            className="navbar-button"
            onClick={() => setOpen((prev: boolean) => !prev)}
            aria-label="Menu"
          >
            <Menu size={30} />
          </button>

          <div className={`navbar-dropdown ${open ? "show" : ""}`}>
            <button className="navbar-item" onClick={toggleModalProfile}>
              <User /> <span>Perfil</span>
            </button>
            <button className="navbar-item" onClick={toggleTheme}>
              {theme === "dark" ? <Sun /> : <Moon />}{" "}
              <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
            </button>
            <button className="navbar-item logout" onClick={handleLogout}>
              <LogOut /> <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
