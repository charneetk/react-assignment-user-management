import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./NavBar";
import { TodoProvider } from "../contexts/TodoProvider";
import { useAuth } from "../contexts/AuthProvider";

const Layout = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  let userIdToFetchTodos = undefined;
  console.log("in layout ", userId, currentUser);

  if (userId) {
    userIdToFetchTodos = Number(userId);
  } else {
    if (currentUser?.role !== "admin") {
      userIdToFetchTodos = Number(currentUser?.id);
    }
  }
  console.log("userId to fetch ", userIdToFetchTodos);
  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans text-gray-800"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Navbar />
      <TodoProvider userId={userIdToFetchTodos}>
        <Outlet />
      </TodoProvider>
    </div>
  );
};

export default Layout;
