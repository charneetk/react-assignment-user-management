import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = localStorage.getItem("user");
  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the requested route (children)
  return <Outlet />;
};

export default ProtectedRoute;
