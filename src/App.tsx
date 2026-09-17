import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { VideoPage } from './pages/VideoPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { ScrollToTop } from './components/common/ScrollToTop';

// Protected route wrapper
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = localStorage.getItem('ckb_auth') === 'true';
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Pages */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/news"
          element={
            <RequireAuth>
              <NewsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/application"
          element={
            <RequireAuth>
              <ApplicationPage />
            </RequireAuth>
          }
        />
        <Route
          path="/video"
          element={
            <RequireAuth>
              <VideoPage />
            </RequireAuth>
          }
        />
        <Route
          path="/chatbot"
          element={
            <RequireAuth>
              <ChatbotPage />
            </RequireAuth>
          }
        />
        <Route
          path="/learning-center"
          element={
            <RequireAuth>
              <LearningCenterPage />
            </RequireAuth>
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
