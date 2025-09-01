import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import AddAsset from "./pages/AddAsset";
import AddYardip from "./pages/AddYardip";
import AssetData from "./pages/AssetData";
import YardipData from "./pages/YardipData";
import Reports from "./pages/Reports";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-asset"
            element={
              <ProtectedRoute roles={["Admin", "Operator Slog"]}>
                <Layout>
                  <AddAsset />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-yardip"
            element={
              <ProtectedRoute roles={["Admin", "Operator Sren"]}>
                <Layout>
                  <AddYardip />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssetData />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/yardip"
            element={
              <ProtectedRoute>
                <Layout>
                  <YardipData />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
