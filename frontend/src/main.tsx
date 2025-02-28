import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import HomePage from "./Pages/HomePage/HomePage.tsx";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.tsx";
import ExpensePage from "./Pages/ExpensePage/ExpensePage.tsx";
import ProtectRoute from "./Components/ProtectedRoute.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm.tsx";
import ExpenseFormPage from "./Pages/ExpenseFormPage/ExpenseFormPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/expenses"
            element={
              <ProtectRoute>
                <ExpensePage />
              </ProtectRoute>
            }
          />
          <Route
            path="/ExpenseForm"
            element={<ExpenseFormPage></ExpenseFormPage>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
