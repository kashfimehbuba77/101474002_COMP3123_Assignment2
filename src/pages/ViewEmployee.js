// src/pages/ViewEmployee.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosClient";
import Navbar from "../components/NavBar";

const ViewEmployee = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/emp/employees/${id}`);
        setEmp(res.data.data || res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employee.");
      }
    };
    load();
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <p className="error-text">{error}</p>
        </div>
      </>
    );
  }

  if (!emp) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>
          {emp.first_name} {emp.last_name}
        </h2>
        <p><strong>Email:</strong> {emp.email}</p>
        <p><strong>Position:</strong> {emp.position}</p>
        <p><strong>Department:</strong> {emp.department}</p>
        <p><strong>Salary:</strong> {emp.salary}</p>
        <p>
          <strong>Date of Joining:</strong>{" "}
          {emp.date_of_joining &&
            new Date(emp.date_of_joining).toLocaleDateString()}
        </p>
        <Link to="/employees" className="primary-btn">
          Back to list
        </Link>
      </div>
    </>
  );
};

export default ViewEmployee;
