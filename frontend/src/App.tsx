import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <ProtectedRoute path="/" element={<PatientList />} />
            <ProtectedRoute path="/patient/:id" element={<PatientDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
