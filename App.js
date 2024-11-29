import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        {/* Redirect to Dashboard if already logged in */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        
        {/* Protected route for Dashboard */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
