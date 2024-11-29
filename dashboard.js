import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
      return;
    }

    // Decode the token to get user info (you can use a library like jwt-decode)
    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    // Set user data from decoded token (for example, user name or email)
    setUser(decodedToken);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h2>Welcome to your Dashboard</h2>
      {user ? (
        <>
          <p>Hello, {user.name || "User"}!</p>
          <p>Your email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <p>Here you can view your profile and manage your settings.</p>
    </div>
  );
};

export default Dashboard;

