import React, { useState, useEffect } from 'react';
import { InvitationProvider, useInvitation } from './context/InvitationContext';
import { InvitationView } from './components/Invitation/InvitationView';
import { LandingPage } from './components/Catalog/LandingPage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminAuth } from './components/Admin/AdminAuth';

function AppContent() {
  const { currentSlug } = useInvitation();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authRole, setAuthRole] = useState('superadmin'); // 'superadmin' | 'client'

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
          onAuthenticated={({ role }) => {
            setIsAuthenticated(true);
            setAuthRole(role || 'client');
          }}
          onCancel={handleExitAdmin}
        />
      );
    }
    return <AdminPanel onExitAdmin={handleExitAdmin} authRole={authRole} />;
  }

  // Jika di root URL (/) tanpa slug klien, tampilkan Landing Page Katalog & Harga
  if (!currentSlug) {
    return (
      <LandingPage 
        onSelectSlug={(slug) => {
          window.location.href = `/${slug}`;
        }}
        onOpenAdmin={handleOpenAdmin}
      />
    );
  }

  // Jika URL memiliki slug (contoh: /febri-ananta atau /ipi-seli), tampilkan undangan klien
  return <InvitationView onOpenAdmin={handleOpenAdmin} />;
}

export default function App() {
  return (
    <InvitationProvider>
      <AppContent />
    </InvitationProvider>
  );
}
