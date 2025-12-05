import { api } from "./api";

export const authApi = {
  register: (payload: { email: string; password: string; role?: string }) =>
    api.post("/auth/register", payload),

  login: (payload: { email: string; password: string }) =>
    api.post("/auth/login", payload),

  me: () => api.get("/auth/me"),

  logout: () => api.post("/auth/logout"),
};
