import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/auth/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginImg from "@/assets/login.png";
import "@/styles/account.css";
import { Key, Mail, User } from "lucide-react";
import ModalRecoverPassword from "@/components/ModalRecoverPassword";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const Account = () => {
  const { setLoading, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [changeMode, setChangeMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
            .min(5, "El nombre debe tener al menos 5 caracteres")
            .required("El nombre es obligatorio"),
    });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (isLogin) {
        await authService.signInRequest(values.email, values.password);
      } else {
        await authService.signupRequest(values.email, values.password, values.name);
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
    }
  };

  // controller when the screen is small
  const handleChangeIsLogin = () => {
    if (window.innerWidth <= 1050) {
      setLoading(true);
      setIsLogin((pre) => !pre);
      setTimeout(() => {
        setLoading(false);
      }, 400);
    } else {
      setChangeMode((pre) => !pre);
      setTimeout(() => {
        setIsLogin((pre) => !pre);
      }, 400);
    }
  };

  const toggleshowModalDelete = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loading) return null;

  return (
    <>
      {showModal && <ModalRecoverPassword toggleshowModalDelete={toggleshowModalDelete} />}

      <div className={`account-page ${changeMode ? "login-mode" : "signup-mode"}`}>
        <div className="card-Account">
          <h2>{isLogin ? "Inicia sesión en tu cuenta" : "Crea una cuenta nueva"}</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(isLogin)}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form className="form-container-account" onSubmit={handleSubmit}>
                <div className="form-container-input">
                  <label htmlFor="email">Email:</label>
                  <div className="input-container">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="input-form"
                      placeholder="ejemplo@correo.com"
                    />
                    <Mail />
                  </div>
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                {!isLogin && (
                  <div className="container-input">
                    <label htmlFor="name">Name:</label>
                    <div className="input-container">
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="input-form"
                        placeholder="Tu nombre"
                      />
                      <User />
                    </div>
                    <ErrorMessage name="name" component="div" className="error" />
                  </div>
                )}
                <div className="container-input">
                  <label htmlFor="password">Password:</label>
                  <div className="input-container">
                    <Field type="password" id="password" name="password" className="input-form" />
                    <Key />
                  </div>
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <button type="submit" className="btn-submit">
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <button onClick={handleChangeIsLogin}>
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
          {isLogin && <button onClick={toggleshowModalDelete}>Recuperar Contraseña</button>}
        </div>
        <div className="img-container">
          <img src={LoginImg} alt="login-img" />
        </div>
      </div>
    </>
  );
};
