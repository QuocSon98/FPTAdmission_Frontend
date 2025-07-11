import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext"; // Hook kiểm tra trạng thái đăng nhập

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { user } = useAuth(); // kiểm tra user đã login hay chưa

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
