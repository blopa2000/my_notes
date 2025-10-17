import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario autenticado → redirige al login
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
