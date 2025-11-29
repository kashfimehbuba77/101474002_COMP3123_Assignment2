// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="vsco-navbar">
      <div className="vsco-logo">✨ EmployeeHub</div>
      <nav className="vsco-nav-links">
        <Link to="/employees" className="vsco-nav-link">
          Employees
        </Link>
        <Link to="/employees/new" className="vsco-nav-link">
          Add Employee
        </Link>
        <Link to="/login" className="vsco-nav-link">
          Logout
        </Link>
      </nav>
    </header>
  );
}
