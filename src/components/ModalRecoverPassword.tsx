import Modal from "./Modal";
import "@/styles/modalProfile.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

interface ModalRecoverPasswordProps {
  toggleshowModalDelete: () => void;
}

interface recoverPasswordValues {
  email: string;
}

const initialValues: recoverPasswordValues = {
  email: "",
};

const ModalRecoverPassword = ({ toggleshowModalDelete }: ModalRecoverPasswordProps) => {
  const validationSchema = () =>
    Yup.object().shape({
      email: Yup.string().email("El correo no es válido").required("El correo es obligatorio"),
    });

  const handleSubmit = async (values: recoverPasswordValues) => {
    try {
      await authService.resetPasswordRequest(values.email);
      toast.success("Revisa tu bandeja de correo para recuperar tu contraseña.🎉");
      toggleshowModalDelete();
    } catch (error) {
      console.error(error);
      toast.error("Ups... hubo un error al recuperar tu contraseña. Intenta de nuevo.");
    }
  };

  return (
    <Modal toggleshowModalDelete={toggleshowModalDelete}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="form-container">
            <div className="form-container-name">
              <label className="FRM-label" htmlFor="email">
                Correo de recuperacion
              </label>
              <Field id="email" name="email" type="email" className="FRM-input" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
              <button type="button" className="btn" onClick={toggleshowModalDelete}>
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalRecoverPassword;
