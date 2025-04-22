// components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  console.log("Auth val ", auth, "...", auth.user);
  // If not authenticated, redirect to login
  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the requested route (children)
  return <Outlet />;
};

export default PrivateRoute;
