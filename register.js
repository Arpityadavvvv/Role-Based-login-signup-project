import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import styles from "../styles/register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  // Add confirmPassword state
  const [role, setRole] = useState("user");  // Default to lowercase role value
  const [username, setUsername] = useState("");  // Add username state
  const [name, setName] = useState("");  // Add name state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const newUser = {
      name: name, // Use name from input field
      username: username, // Use username from input field
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role.toLowerCase()  // Ensure the role is lowercase before sending to backend
    };
  
    console.log("Sending registration data:", newUser);  // Log the data you're sending
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", newUser, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      console.log("Registration successful:", response.data);  // Log the successful response
      toast.success("Registration successful! Redirecting to login.");
      navigate("/");  // Redirect to login page after successful registration
    } catch (err) {
      console.error("Error during registration:", err.response ? err.response.data : err.message);  // Handle error response
      toast.error(err.response ? err.response.data.message : "Registration failed.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {/* Input for name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}  // Handle name input
            required
          />
          {/* Input for username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Handle username input
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}  // Handle confirmPassword input
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

