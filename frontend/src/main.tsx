import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Expenses from "./features/expenses/components/Expenses/Expenses.tsx";
import CreateExpense from "./features/expenses/components/CreateExpense/CreateExpense.tsx";
import HomePage from "./features/home/components/HomePage/Home.tsx";
import Login from "./features/auth/components/Login/Login.tsx";
import Register from "./features/auth/components/Register/Register.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ExpenseForm"
            element={<CreateExpense></CreateExpense>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
