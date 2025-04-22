import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";

import Login from "./components/Login";
import { Register } from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import EventBus from "./common/EventBus";
import { User } from "./interfaces/IUser";
import UserBoard from "./components/UserBoard";
import PrivateRoute from "./common/PrivateRouter";
import { useAuth } from "./contexts/AuthProvider";

const App: React.FC = () => {
  const { auth, setAuth } = useAuth();

  console.log("Auth   ", auth.user);
  const logOut = () => {
    AuthService.logout();
    setAuth({});
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {auth.user && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {auth.user ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {auth.user.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/logout" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<UserBoard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
