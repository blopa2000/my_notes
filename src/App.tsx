import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Layount } from "./components/Layount";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
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
        </Route>
        <Route path="login" element={<h1>Login</h1>} />
        <Route path="register" element={<h1>Register</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
