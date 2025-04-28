import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { TodoProvider } from "./contexts/TodoProvider";
import { useParams } from "react-router-dom";

const App: React.FC = () => {
  const { userId } = useParams();
  console.log("userId to pass ", userId);
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <AppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
