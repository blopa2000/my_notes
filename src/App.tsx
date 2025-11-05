import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Layount } from "./components/Layount";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Account from "./pages/Account";
import Loading from "./components/Loading";
import { useAuth } from "./context/auth/AuthContext";
import NoteForm from "./pages/NoteForm";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<>landing page</>} />
        <Route path="dashboard" element={<Layount />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit"
            element={
              <ProtectedRoute>
                <NoteForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-note"
            element={
              <ProtectedRoute>
                <NoteForm />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="account" element={<Account />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
