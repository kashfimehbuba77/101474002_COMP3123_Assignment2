// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "#fff",
      }}
    >
      <div>
        <Link to="/employees" style={{ color: "#61dafb", marginRight: 16 }}>
          Employees
        </Link>
        <Link to="/employees/add" style={{ color: "#61dafb" }}>
          Add Employee
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          background: "#ff4d4f",
          border: "none",
          padding: "6px 12px",
          borderRadius: 4,
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
