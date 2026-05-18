import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import PredictionResultPage from "./pages/PredictionResultPage";
import CompareYearsPage from "./pages/CompareYearsPage";
import HistoryPage from "./pages/HistoryPage";
import MapViewPage from "./pages/MapViewPage";
import AdminTenantPage from "./pages/AdminTenantPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { AuthContext } from "./services/authContext";

const demoUser = {
  id: 2,
  fullName: "Aarav Mehta",
  email: "tenantadmin@urbanscope.ai",
  role: "TenantAdmin",
  tenantName: "GreenGrid Analytics"
};

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("urbanscope_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("urbanscope_user");
    return saved ? JSON.parse(saved) : null;
  });

  const authValue = {
    user,
    login: () => {
      localStorage.setItem("urbanscope_token", "demo-jwt-token");
      localStorage.setItem("urbanscope_user", JSON.stringify(demoUser));
      setUser(demoUser);
    },
    logout: () => {
      localStorage.removeItem("urbanscope_token");
      localStorage.removeItem("urbanscope_user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="prediction/:id" element={<PredictionResultPage />} />
          <Route path="compare" element={<CompareYearsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="map" element={<MapViewPage />} />
          <Route path="admin" element={<AdminTenantPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
