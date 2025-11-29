import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setIsError(false);

    try {
      await api.post("/user/signup", form);
      setMsg("🌸 Account created successfully!");
      setIsError(false);
      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (err) {
      setIsError(true);
      setMsg(
        err.response?.data?.message || "Unable to sign up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="center-page">
        <div className="vsco-card">
          <h1 className="vsco-title">Join the Workspace 💫</h1>
          <p className="vsco-subtitle">
            Create an account to start managing employees.
          </p>

          {msg && (
            <p
              className={
                "vsco-msg " + (isError ? "vsco-msg-error" : "vsco-msg-success")
              }
            >
              {msg}
            </p>
          )}

          <form className="vsco-form" onSubmit={handleSubmit}>
            <div className="vsco-field">
              <label className="vsco-label">Username</label>
              <input
                className="vsco-input"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="vsco-field">
              <label className="vsco-label">Email</label>
              <input
                className="vsco-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="vsco-field">
              <label className="vsco-label">Password</label>
              <input
                className="vsco-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="vsco-btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p
            style={{
              marginTop: 16,
              fontSize: 13,
              textAlign: "center",
              color: "#76618f",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" className="vsco-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
