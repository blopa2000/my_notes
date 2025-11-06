import { useAuth } from "@/context/auth/AuthContext";
import Modal from "./Modal";
import "@/styles/modalProfile.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userServices } from "@/services/userServices";
import toast from "react-hot-toast";

interface ModalProfileProps {
  toggleModalProfile: () => void;
}

interface ProfileValues {
  name: string;
}

const ModalProfile = ({ toggleModalProfile }: ModalProfileProps) => {
  const { user, updateUser } = useAuth();

  const initialValues: ProfileValues = {
    name: user?.name || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "El nombre debe tener al menos 5 caracteres")
      .required("El nombre es obligatorio"),
  });

  const handleSubmit = async (values: ProfileValues) => {
    if (!user?.uid) {
      toast.error("No se encontró el usuario.");
      return;
    }

    try {
      await userServices.updateUser({ name: values.name, uid: user.uid });
      updateUser({ name: values.name });
      toast.success("Perfil actualizado correctamente 🎉");
      toggleModalProfile();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil.");
    }
  };

  return (
    <Modal toggleshowModalDelete={toggleModalProfile}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="form-container">
            <div className="form-container-name">
              <label className="FRM-label" htmlFor="name">
                Nombre de usuario:
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="FRM-input"
                placeholder="Escribe tu nombre"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
              <button type="button" className="btn" onClick={toggleModalProfile}>
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalProfile;
