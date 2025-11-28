// src/pages/AddEmployee.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import Navbar from "../components/NavBar";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  position: "",
  salary: "",
  date_of_joining: "",
  department: "",
};

const AddEmployee = () => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/emp/employees", {
        ...form,
        salary: Number(form.salary),
      });
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to create employee."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Add Employee</h2>
        <form className="emp-form" onSubmit={onSubmit}>
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={onChange}
            required
          />
          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={onChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={onChange}
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={onChange}
            required
          />
          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={onChange}
            required
          />
          <label className="input-label">
            Date of Joining:
            <input
              name="date_of_joining"
              type="date"
              value={form.date_of_joining}
              onChange={onChange}
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-btn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
