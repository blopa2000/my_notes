import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import { noteService } from "@/services/noteService";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import "@/styles/noteForm.css";
import { useNotes } from "@/context/notes/NotesContext";
import TiptapEditor from "@/components/TiptapEditor";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .required("El título es obligatorio"),
});

export const NoteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getNoteById, updateNote, addNote } = useNotes();
  const { noteId } = location.state || {};
  const [content, setContent] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: "",
    bgColor: "#ffffff",
    creationDate: "",
  });

  useEffect(() => {
    if (noteId && user?.uid) {
      const existingNote = getNoteById(noteId);
      if (existingNote) {
        setInitialValues({
          title: existingNote.title,
          bgColor: existingNote.bgColor,
          creationDate: existingNote.creationDate,
        });
        setContent(existingNote.content);
      }
    }
  }, [noteId, user, getNoteById]);

  const handleContentChange = (html: string) => {
    setContent(html);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!user?.uid) return;
    setLoadingBtn(true);

    try {
      if (noteId) {
        // Editar nota existente
        const data = {
          ...values,
          content: content.length > 0 ? content : "",
        };

        const lastUpdate = await noteService.updateNote(user.uid, noteId, data);

        updateNote({
          ...data,
          noteId,
          lastUpdate,
        });

        toast.success("✅ Nota actualizada correctamente");
      } else {
        // Crear nueva nota
        const newNote = await noteService.createNote(user.uid, {
          ...values,
          content,
        });

        addNote(newNote);
        toast.success("📝 Nota creada con éxito");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al guardar la nota. Inténtalo de nuevo.");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">{noteId ? "Editar Nota" : "Nueva Nota"}</h1>

      <div className="edit-box">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={22} />
        </button>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={NoteSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="edit-form">
              <button disabled={loadingBtn} type="submit" className="save-btn">
                {loadingBtn ? <Loader2 className="loading-icon" size={18} /> : <Save size={18} />}
                <span>{noteId ? "Guardar cambios" : "Crear nota"}</span>
              </button>

              <Field
                name="bgColor"
                type="color"
                className="edit-form-color"
                value={values.bgColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue("bgColor", e.target.value)
                }
              />

              {errors.title && touched.title && (
                <p className="error-message form-error-title">{errors.title}</p>
              )}
              <Field
                name="title"
                type="text"
                placeholder="Escribe un título..."
                className="edit-form-title"
              />

              <TiptapEditor value={content} onChange={handleContentChange} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
