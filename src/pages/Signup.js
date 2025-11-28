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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/user/signup", form);
      setMsg("🌸 Account created successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMsg("❌ Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-pink-100">

        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Create Account 🌸
        </h1>

        {msg && (
          <p className="text-center text-sm mb-4 text-pink-600 font-semibold">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Password</label>
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
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
