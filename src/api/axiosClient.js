// src/api/axiosClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://101474002-comp-3123-assignment01.vercel.app/api/v1",
});


// If later you add JWT on backend, this will attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
