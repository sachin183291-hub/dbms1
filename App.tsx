
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectInfo from './pages/ProjectInfo';
import QueryPage from './pages/QueryPage';
import CommunityForum from './pages/CommunityForum';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import TechnicalInfo from './pages/TechnicalInfo';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import SearchPage from './pages/SearchPage';
import WeatherPage from './pages/WeatherPage';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

const ProtectedRoute = ({ children, allowedRoles }: React.PropsWithChildren<{ allowedRoles?: string[] }>) => {
  const role = localStorage.getItem('userRole');
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<ProtectedRoute><ProjectInfo /></ProtectedRoute>} />
                <Route path="/technical" element={<ProtectedRoute><TechnicalInfo /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
                <Route path="/query" element={<ProtectedRoute allowedRoles={['Farmer']}><QueryPage /></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute allowedRoles={['Farmer']}><CommunityForum /></ProtectedRoute>} />
                <Route path="/onboarding" element={<ProtectedRoute allowedRoles={['Farmer']}><Onboarding /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute allowedRoles={['Farmer']}><Profile /></ProtectedRoute>} />
                <Route path="/store" element={<ProtectedRoute allowedRoles={['Farmer']}><Store /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute allowedRoles={['Farmer']}><Checkout /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['Officer']}><Dashboard /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
