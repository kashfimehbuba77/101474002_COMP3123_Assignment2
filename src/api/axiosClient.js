// src/api/axiosClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://101474002-comp-3123-assignment01.vercel.app/api/v1",
});

// Attach token if you add JWT later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
