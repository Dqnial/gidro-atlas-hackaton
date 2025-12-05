import { create } from "zustand";
import { authApi } from "../api/authApi";

interface AuthState {
  user: any | null;
  isAuthed: boolean;
  loading: boolean; // для действий login/register
  isCheckingAuth: boolean; // для проверки текущей авторизации
  error: string | null;

  register: (email: string, password: string, role?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthed: false,
  loading: false,
  isCheckingAuth: true,
  error: null,

  // Регистрация
  register: async (email, password, role) => {
    try {
      set({ loading: true, error: null });

      await authApi.register({ email, password, role });
      await authApi.login({ email, password });

      const me = await authApi.me();
      set({ user: me.data, isAuthed: true });
    } catch (e: any) {
      set({ error: e.response?.data?.message || "Ошибка регистрации" });
    } finally {
      set({ loading: false });
    }
  },

  // Логин
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      await authApi.login({ email, password });
      const me = await authApi.me();
      set({ user: me.data, isAuthed: true });
    } catch (e: any) {
      set({ error: e.response?.data?.message || "Ошибка входа" });
      set({ isAuthed: false });
    } finally {
      set({ loading: false });
    }
  },

  // Загрузка текущего пользователя
  fetchUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const me = await authApi.me();
      set({ user: me.data, isAuthed: !!me.data });
    } catch {
      set({ user: null, isAuthed: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Выход
  logout: async () => {
    await authApi.logout();
    set({ user: null, isAuthed: false });
  },
}));
