import { Routes, Route } from "react-router";
import Loading from "./components/Loading";
import { Layount } from "./components/Layount";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/auth/AuthContext";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const Account = lazy(() =>
  import("./pages/Account").then((module) => ({ default: module.Account }))
);
const NoteForm = lazy(() =>
  import("./pages/NoteForm").then((module) => ({ default: module.NoteForm }))
);
const PageNotFound = lazy(() =>
  import("./pages/PageNotFound").then((module) => ({ default: module.PageNotFound }))
);

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
}

export default App;
