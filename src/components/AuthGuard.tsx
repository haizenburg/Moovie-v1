/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserSessionStore from "../store/userSessionStore";

const AuthGuard: React.FC = () => {
  const user = useUserSessionStore((state: any) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
