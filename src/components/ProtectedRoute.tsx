import { Navigate } from "react-router";
import { useAuth } from "../context/auth/AuthContext";
import type { WithChildren } from "../utils/types";

export function ProtectedRoute({ children }: WithChildren) {
  const { user, loading } = useAuth();

  if (loading) return null;

  // Si no hay usuario autenticado → redirige al login
  if (!user) return <Navigate to="/account" replace />;

  return children;
}
