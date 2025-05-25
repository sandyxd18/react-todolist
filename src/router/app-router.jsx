import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

import MainLayout from "../layout/main-layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserList from "../pages/UserList";
import ResetPassword from "../pages/auth/ResetPassword";
import TechStack from "../pages/TechStack";
import TodoList from "../pages/TodoList";

import ProtectedRoute from "./protected-route";
import { getToken } from "../lib/api/token";

export default function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/register", "/tech-stack"];

    const interval = setInterval(() => {
      const token = getToken();
      if (!token && !publicRoutes.includes(location.pathname)) {
        navigate("/");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<TodoList />} />
        <Route
          path="/user-list"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:id/reset-password" element={<ResetPassword />} />
        <Route path="/tech-stack" element={<TechStack />} />
      </Route>
    </Routes>
  );
}
