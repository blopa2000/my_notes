import { useNavigate } from "react-router";
import landingImg from "../assets/landingImg.png";
import "../styles/landing.css";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>My Notes</h1>
          <p>Organiza tus ideas. Inspírate. Crea sin límites.</p>
          <button onClick={() => navigate("/account")} className="btn-primary">
            Comienza ahora
          </button>
        </div>
      </section>

      <section className="about">
        <h2>¿Qué es My Notes?</h2>
        <p>
          <strong>My Notes</strong> es una aplicación creada para ayudarte a capturar tus ideas,
          recordatorios y proyectos personales de forma rápida y segura. Guarda tus notas, edítalas
          desde cualquier lugar y mantén tu mente organizada.
        </p>
      </section>

      <section className="features">
        <h2>Características principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📝 Crea y edita notas</h3>
            <p>Agrega notas con títulos, colores personalizados y contenido ilimitado.</p>
          </div>
          <div className="feature-card">
            <h3>☁️ Sincronización</h3>
            <p>Tus notas se guardan en la nube y están disponibles desde cualquier dispositivo.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Privacidad</h3>
            <p>Solo tú puedes acceder a tus notas con tu cuenta segura y autenticada.</p>
          </div>
          <div className="feature-card">
            <h3>✨ Interfaz limpia</h3>
            <p>Diseño minimalista enfocado en lo que importa: tus ideas.</p>
          </div>
        </div>
      </section>

      <section className="mockup-container">
        <div className="mockup">
          <img src={landingImg} alt="My Notes Mockup" />
        </div>
      </section>

      <section className="cta">
        <h2>Empieza a crear tus notas hoy</h2>
        <button onClick={() => navigate("/account")} className="btn-secondary">
          Crear una cuenta
        </button>
      </section>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} My Notes — Proyecto desarrollado por Juan Pablo Agudelo
          Castro
        </p>
        <p>
          GitHub: <a href="https://github.com/blopa2000">blopa2000</a>
        </p>
      </footer>
    </div>
  );
}
