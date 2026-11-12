import React, { useState, useEffect } from 'react';
import { InvitationProvider } from './context/InvitationContext';
import { InvitationView } from './components/Invitation/InvitationView';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminAuth } from './components/Admin/AdminAuth';

function AppContent() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Deteksi route: cek apakah membuka path /admin atau query legacy ?panel=admin
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin');
      const isParamAdmin = params.get('panel') === 'admin';
      setIsAdminMode(isPathAdmin || isParamAdmin);
    };

    syncRouteFromUrl();
    window.addEventListener('popstate', syncRouteFromUrl);
    return () => window.removeEventListener('popstate', syncRouteFromUrl);
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminMode(true);
    // Navigasi URL bersih ke /admin
    window.history.pushState({}, '', '/admin');
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
    // Kembali ke halaman utama /
    window.history.pushState({}, '', '/');
  };

  if (isAdminMode) {
    if (!isAuthenticated) {
      return (
        <AdminAuth
          onAuthenticated={() => setIsAuthenticated(true)}
          onCancel={handleExitAdmin}
        />
      );
    }
    return <AdminPanel onExitAdmin={handleExitAdmin} />;
  }

  return <InvitationView onOpenAdmin={handleOpenAdmin} />;
}

export default function App() {
  return (
    <InvitationProvider>
      <AppContent />
    </InvitationProvider>
  );
}
