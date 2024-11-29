import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to login page
  };

  // Check if the user is logged in (by checking if the token exists in localStorage)
  const isAuthenticated = localStorage.getItem("token");

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>MyApp</h2>
      </div>
      <div className={styles.links}>
        {!isAuthenticated ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
