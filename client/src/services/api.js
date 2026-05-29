import axios from "axios";

/**
 * Base URL resolution order:
 *  1. VITE_API_URL env var (set in Render dashboard for production)
 *  2. /api (hits the Vite dev-server proxy in local development)
 */
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

// ── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Attach auth token here if you add authentication later
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// ── Response interceptor — unwrap data, normalise errors ─────────────────────
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message ??
      (err.code === "ECONNABORTED" ? "Request timed out. Is the server running?" : err.message) ??
      "Network error";
    return Promise.reject(new Error(message));
  }
);

// ── Task service ─────────────────────────────────────────────────────────────
export const taskService = {
  /** @returns {Promise<Task[]>} */
  getAll: (params = {}) => api.get("/tasks", { params }),

  /** @returns {Promise<Task>} */
  create: (data) => api.post("/tasks", data),

  /** @returns {Promise<Task>} */
  update: (id, data) => api.put(`/tasks/${id}`, data),

  /** @returns {Promise<void>} */
  remove: (id) => api.delete(`/tasks/${id}`),

  /** @returns {Promise<Task>} */
  toggle: (id) => api.patch(`/tasks/${id}/toggle`),
};

// ── Report service ────────────────────────────────────────────────────────────
export const reportService = {
  weekly:    () => api.get("/reports/weekly"),
  monthly:   () => api.get("/reports/monthly"),
  analytics: () => api.get("/reports/analytics"),
};

export default api;