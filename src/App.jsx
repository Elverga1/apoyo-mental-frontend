// src/App.jsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { ChatPage } from './pages/ChatPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { LoginPage } from './pages/LoginPage';
import ResourcesLibrary from './components/ResourcesLibrary';
import ReportsDashboard from './components/ReportsDashboard';
import authService from './services/authService';
import './index.css';

const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/chat" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } />
          <Route path="/assessments" element={
            <PrivateRoute>
              <AssessmentsPage />
            </PrivateRoute>
          } />
          <Route path="/resources" element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="bg-blue-600 dark:bg-blue-800 text-white p-4">
                  <div className="flex items-center gap-4">
                    <a href="/" className="p-1 hover:bg-white/20 rounded-full">←</a>
                    <h1 className="font-semibold">Recursos de Apoyo</h1>
                  </div>
                </div>
                <ResourcesLibrary />
              </div>
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="bg-blue-600 dark:bg-blue-800 text-white p-4">
                  <div className="flex items-center gap-4">
                    <a href="/" className="p-1 hover:bg-white/20 rounded-full">←</a>
                    <h1 className="font-semibold">Reportes y Progreso</h1>
                  </div>
                </div>
                <ReportsDashboard />
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
