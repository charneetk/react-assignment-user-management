import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import UserBoard from "../pages/UserBoard";
import Todo from "../pages/ToDo";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<UserBoard />} />
          <Route path="/todo/:userId?" element={<Todo />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
