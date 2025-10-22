import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Layount } from "./components/Layount";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Account from "./pages/Account";
import Loading from "./components/Loading";
import { useAuth } from "./context/auth/AuthContext";
import EditNote from "./pages/EditNote";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
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
                <EditNote />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="account" element={<Account />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
