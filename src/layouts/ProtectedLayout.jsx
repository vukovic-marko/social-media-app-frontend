import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import ProtectedNavbar from "../components/ProtectedNavbar";

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();

  const handleLogout = e => {
    e.preventDefault();

    logout();
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <ProtectedNavbar handleLogout={handleLogout} />
      <Outlet />
    </div>
  )
}