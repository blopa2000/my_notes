import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/auth/AuthContext";
import { useNavigate } from "react-router";

const Account = () => {
  const { setLoading, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "test2@gmail.com",
    password: "test12345",
    name: "test",
  });

  const handleOnsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (isLogin) {
      // Lógica de inicio de sesión aquí
      try {
        const res = await authService.signInRequest(form.email, form.password);
        if (res.user) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Lógica de registro aquí
      try {
        await authService.signupRequest(form.email, form.password, form.name);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error al registrarse:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loading) return null;

  return (
    <div className="account-page">
      {isLogin ? "Inicia sesión en tu cuenta" : "Crea una cuenta nueva"}
      <form onSubmit={handleOnsubmit}>
        <div className="container-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input-form"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {!isLogin && (
          <div className="container-input">
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              id="name"
              name="name"
              className="input-form"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="container-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="input-form"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
};

export default Account;
