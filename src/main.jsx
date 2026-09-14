import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./index.css";

// Yashirin /arizalar sahifasi — navbar yoki menyuda hech qayerda ko'rsatilmaydi,
// faqat URL orqali topiladi. Alohida router kutubxonasi kerak emas,
// chunki loyihada bor-yo'g'i shu bitta qo'shimcha "sahifa" bor.
const isAdminRoute = window.location.pathname.replace(/\/+$/, "") === "/arizalar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </React.StrictMode>
);
