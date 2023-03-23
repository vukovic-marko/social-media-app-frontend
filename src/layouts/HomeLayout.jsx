import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"

export const HomeLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}