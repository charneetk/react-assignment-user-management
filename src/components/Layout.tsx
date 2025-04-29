import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./NavBar";
import { TodoProvider } from "../contexts/TodoProvider";
import { useAuth } from "../contexts/AuthProvider";
import { customClasses } from "../utils/constant";

const Layout = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  let userIdToFetchTodos = undefined;

  if (userId) {
    userIdToFetchTodos = Number(userId);
  } else {
    if (currentUser?.role !== "admin") {
      userIdToFetchTodos = Number(currentUser?.id);
    }
  }
  return (
    <div
      className={customClasses.layout}
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
