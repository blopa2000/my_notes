import { useEffect, useRef, useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { authService } from "../services/authService";
import "../styles/navbar.css";
import { useAuth } from "../context/auth/AuthContext";
import { Link } from "react-router";
import { useNotes } from "../context/notes/NotesContext";
import ModalProfile from "./ModalProfile";

const Navbar = () => {
  const { setLoading, cleadState } = useAuth();
  const { setNotes } = useNotes();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.signOutRequest();
      cleadState();
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
          <button className="navbar-button" onClick={() => setOpen((prev: boolean) => !prev)}>
            <Menu size={30} />
          </button>

          <div className={`navbar-dropdown ${open ? "show" : ""}`}>
            <button className="navbar-item" onClick={toggleModalProfile}>
              <User /> <h2>Profile</h2>
            </button>
            {/* <button className="navbar-item">
            <Settings /> <h2>Settings</h2>
            </button> */}
            <button className="navbar-item logout" onClick={handleLogout}>
              <LogOut /> <h2>Logout</h2>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
