import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import PriorAuthorizationsList from "./components/PriorAuthorizationList";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <div className="container mx-auto p-4">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PatientList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/:id"
                element={
                  <ProtectedRoute>
                    <PatientDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/authorization-list"
                element={
                  <ProtectedRoute>
                    <PriorAuthorizationsList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
