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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/expenses" element={<ExpensePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
