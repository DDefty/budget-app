import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Transactions from "@/pages/Transactions";
import Budgets from "@/pages/Budgets";
import ImportPage from "@/pages/Import";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import NotFound from "@/pages/NotFound";
import { useAppSelector } from "@/app/hooks";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { status} = useAppSelector(u => u.user);
  return status === 'loggedIn' ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/"
          element={
              <AppLayout><Dashboard/></AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout><Dashboard/></AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
              <AppLayout><Transactions/></AppLayout>
          }
        />
        <Route
          path="/budgets"
          element={
            <PrivateRoute>
              <AppLayout><Budgets/></AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/import"
          element={
            <PrivateRoute>
              <AppLayout><ImportPage/></AppLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
