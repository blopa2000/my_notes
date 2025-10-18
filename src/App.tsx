import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Layount } from "./components/Layount";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Account from "./pages/Account";

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
        <Route path="account" element={<Account />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
