// src/main.jsx
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import AllRecipesPage from './pages/AllRecipesPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DesktopNavbar from './components/navbar/DesktopNavbar.jsx';
import MobileNavbar from './components/navbar/MobileNavbar.jsx';
import './index.css';
import PWABadge from './PWABadge';

// 1. Buat Komponen Layout
// Komponen ini berisi semua elemen UI yang sama di setiap halaman (Navbar, Footer, dll.)
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Logika untuk mendapatkan halaman saat ini, sekarang berada di dalam Layout
  const currentPage = location.pathname.substring(1) || 'home';

  const handleNavigation = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="min-h-screen">
        {/* 2. Gunakan <Outlet /> untuk merender komponen Route yang cocok */}
        <Outlet />
      </main>
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <PWABadge />
    </div>
  );
}

// 3. Sederhanakan Komponen App
// Komponen App sekarang hanya bertanggung jawab untuk mendefinisikan rute/routing
function App() {
  return (
    <Routes>
      {/* Rute parent menggunakan komponen Layout */}
      <Route path="/" element={<Layout />}>
        {/* Rute-rute ini akan di-render di dalam <Outlet /> pada Layout */}
        <Route index element={<HomePage />} /> {/* 'index' berarti ini adalah route default untuk '/' */}
        <Route path="resep" element={<AllRecipesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }
  
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