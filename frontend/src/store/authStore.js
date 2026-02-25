import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: Boolean(localStorage.getItem("token")),
  role: localStorage.getItem("role") || "",
  token: localStorage.getItem("token") || "",

  login: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role || "");
    set({ isAuthenticated: true, token: token, role: role || "" });
  },

  setRole: (role) => {
    localStorage.setItem("role", role || "");
    set({ role: role || "" });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ isAuthenticated: false, token: "", role: "" });
  },
}));

export default useAuthStore;
