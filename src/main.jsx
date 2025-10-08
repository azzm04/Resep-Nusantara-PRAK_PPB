// src/main.jsx
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import AllRecipesPage from './pages/AllRecipesPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DesktopNavbar from './components/navbar/DesktopNavbar.jsx';
import MobileNavbar from './components/navbar/MobileNavbar.jsx';
import './index.css';
import PWABadge from './PWABadge';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPage = location.pathname.substring(1) || 'home';

  const handleNavigation = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resep" element={<AllRecipesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <PWABadge />
    </div>
  );
}

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Bungkus komponen App dengan BrowserRouter untuk mengaktifkan routing
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);