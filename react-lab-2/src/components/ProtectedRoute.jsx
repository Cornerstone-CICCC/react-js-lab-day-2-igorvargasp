import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
