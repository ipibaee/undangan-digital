import React, { useState, useEffect } from 'react';
import { InvitationProvider, useInvitation } from './context/InvitationContext';
import { InvitationView } from './components/Invitation/InvitationView';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminAuth } from './components/Admin/AdminAuth';

function AppContent() {
  const { currentSlug } = useInvitation();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Deteksi route: cek apakah membuka path /admin, /:slug/admin atau query legacy ?panel=admin
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const isPathAdmin = path === '/admin' || path.endsWith('/admin');
      const isParamAdmin = params.get('panel') === 'admin';
      setIsAdminMode(isPathAdmin || isParamAdmin);
    };

    syncRouteFromUrl();
    window.addEventListener('popstate', syncRouteFromUrl);
    return () => window.removeEventListener('popstate', syncRouteFromUrl);
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminMode(true);
    const targetUrl = currentSlug && currentSlug !== 'default' ? `/${currentSlug}/admin` : '/admin';
    window.history.pushState({}, '', targetUrl);
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
    const targetUrl = currentSlug && currentSlug !== 'default' ? `/${currentSlug}` : '/';
    window.history.pushState({}, '', targetUrl);
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
