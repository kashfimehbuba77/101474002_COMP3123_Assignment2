// src/pages/EditEmployee.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";
import Navbar from "../components/NavBar";

const EditEmployee = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/emp/employees/${id}`);
        const emp = res.data.data || res.data;
        const dateIso = emp.date_of_joining
          ? emp.date_of_joining.substring(0, 10)
          : "";
        setForm({ ...emp, date_of_joining: dateIso, salary: emp.salary || "" });
      } catch (err) {
        console.error(err);
        setError("Failed to load employee.");
      }
    };
    load();
  }, [id]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/emp/employees/${id}`, {
        ...form,
        salary: Number(form.salary),
      });
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update employee."
      );
    }
  };

  if (!form) {
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
        <h2>Edit Employee</h2>
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
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
