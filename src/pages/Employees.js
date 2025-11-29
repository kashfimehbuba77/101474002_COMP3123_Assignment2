// src/pages/Employees.js
import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import Navbar from "../components/NavBar";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/emp/employees");
      setEmployees(res.data.data || res.data); // adjust based on your backend shape
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div style={{ padding: "16px" }}>
        <div className="vsco-card-wide">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ margin: 0, color: "#5f3ab7" }}>Employees 💼</h2>
              <p style={{ margin: 0, fontSize: 13, color: "#7b6498" }}>
                Manage your team from a cozy VSCO dashboard.
              </p>
            </div>
            <button className="vsco-btn-secondary">+ Add Employee</button>
          </div>

          <div className="vsco-table-wrapper">
            <table className="vsco-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.first_name} {emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.position}</td>
                    <td>{emp.department}</td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>
                      No employees yet. 🌱 Start by adding one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
