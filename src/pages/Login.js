import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await api.post("/user/login", form);
      setMsg("🌸 Login successful!");
      setTimeout(() => navigate("/employees"), 1200);
    } catch (err) {
      setMsg("❌ Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
        
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Welcome Back 💕
        </h1>

        {msg && (
          <p className="text-center text-sm mb-4 text-pink-600 font-semibold">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-pink-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-pink-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold transition-all shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
