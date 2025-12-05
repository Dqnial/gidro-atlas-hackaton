import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/authStore";
import DashboardPage from "./pages/DashboardPage";
import { Loader } from "lucide-react";

function App() {
  const { user, isAuthed, fetchUser, isCheckingAuth } = useAuthStore();

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthed ? <DashboardPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/register"
          element={!isAuthed ? <RegisterPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/login"
          element={!isAuthed ? <LoginPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
