// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Navbar setAuth={setAuth} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isAuth ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
          </>
        ) : (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
