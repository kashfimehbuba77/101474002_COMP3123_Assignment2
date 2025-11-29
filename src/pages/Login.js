import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await api.post("/user/login", form);
      setMsg("✨ Login successful!");
      setIsError(false);

      // if you add token later:
      // localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate("/employees");
      }, 900);
    } catch (err) {
      setIsError(true);
      setMsg(
        err.response?.data?.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="center-page">
        <div className="vsco-card">
          <h1 className="vsco-title">Welcome Back 💜</h1>
          <p className="vsco-subtitle">
            Log in to manage your employees in style.
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
              {loading ? "Logging in..." : "Login"}
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
            Don’t have an account?{" "}
            <Link to="/signup" className="vsco-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
