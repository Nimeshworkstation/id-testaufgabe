// store/authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  login: (token) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
