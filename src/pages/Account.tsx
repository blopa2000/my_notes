import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/auth/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const Account = () => {
  const { setLoading, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: "",
    password: "",
    name: "",
  };

  const getValidationSchema = (isLogin: boolean) =>
    Yup.object().shape({
      email: Yup.string().email("El correo no es válido").required("El correo es obligatorio"),
      password: Yup.string()
        .min(9, "La contraseña debe tener al menos 9 caracteres")
        .required("La contraseña es obligatoria"),
      name: isLogin
        ? Yup.string().notRequired()
        : Yup.string()
            .min(5, "El nombre debe tener al menos 2 caracteres")
            .required("El nombre es obligatorio"),
    });

  const handleSubmit = async (values: FormValues) => {
    try {
      if (isLogin) {
        const res = await authService.signInRequest(values.email, values.password);
        setLoading(true);
        if (res.user) {
          navigate("/dashboard");
        }
      } else {
        await authService.signupRequest(values.email, values.password, values.name);
        setLoading(true);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        const err = error as { code?: string; message: string };
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("El correo ya está en uso");
            break;
          case "auth/invalid-email":
            toast.error("Correo inválido");
            break;
          case "auth/weak-password":
            toast.error("Contraseña demasiado débil");
            break;
          case "auth/user-not-found":
            toast.error("Usuario no encontrado");
            break;
          case "auth/wrong-password":
            toast.error("Contraseña incorrecta");
            break;
          default:
            toast.error(err.message);
            break;
        }
      } else {
        toast.error("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
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
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(isLogin)}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="container-input">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="input-form"
                placeholder="ejemplo@correo.com"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            {!isLogin && (
              <div className="container-input">
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="input-form"
                  placeholder="Tu nombre"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
            )}
            <div className="container-input">
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" className="input-form" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" className="btn-submit">
              Login
            </button>
          </Form>
        )}
      </Formik>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
};
