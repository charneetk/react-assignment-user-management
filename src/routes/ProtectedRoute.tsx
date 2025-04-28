import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = localStorage.getItem("user");
  console.log("Protected Auth val ", currentUser);
  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the requested route (children)
  return <Outlet />;
};

export default ProtectedRoute;
