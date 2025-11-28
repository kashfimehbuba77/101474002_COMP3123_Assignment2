// src/pages/Employees.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";
import Navbar from "../components/NavBar";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchDept, setSearchDept] = useState("");
  const [searchPos, setSearchPos] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/emp/employees");
      // your backend currently returns {status, message, count, data}
      const list = res.data.data || res.data;
      setEmployees(list);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await api.delete(`/emp/employees/${id}`);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const filtered = employees.filter((e) => {
    const deptMatch = searchDept
      ? e.department?.toLowerCase().includes(searchDept.toLowerCase())
      : true;
    const posMatch = searchPos
      ? e.position?.toLowerCase().includes(searchPos.toLowerCase())
      : true;
    return deptMatch && posMatch;
  });

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h2>Employees</h2>
          <Link className="primary-btn" to="/employees/add">
            + Add Employee
          </Link>
        </div>

        <div className="search-bar">
          <input
            placeholder="Search by department"
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          />
          <input
            placeholder="Search by position"
            value={searchPos}
            onChange={(e) => setSearchPos(e.target.value)}
          />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        <table className="emp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Date of Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp._id}>
                <td>
                  {emp.first_name} {emp.last_name}
                </td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  {emp.date_of_joining &&
                    new Date(emp.date_of_joining).toLocaleDateString()}
                </td>
                <td>
                  <Link to={`/employees/${emp._id}`} className="link-btn">
                    View
                  </Link>
                  <Link
                    to={`/employees/${emp._id}/edit`}
                    className="link-btn"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="danger-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employees;
