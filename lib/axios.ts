import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"; // replace with your backend URL
const API_BASE_URL = "https://a2sv-application-platform-backend-team6.onrender.com"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request if available
axiosInstance.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    // ignore in SSR or if localStorage is unavailable
    console.log("Error setting authorization header:", error);
  }
  return config;
});

export default axiosInstance;
