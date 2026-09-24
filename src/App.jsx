import React, { useState, useEffect } from 'react';
import { InvitationProvider } from './context/InvitationContext';
import { InvitationView } from './components/Invitation/InvitationView';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminAuth } from './components/Admin/AdminAuth';

function AppContent() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check URL query on mount (?panel=admin or /admin)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('panel') === 'admin' || window.location.pathname.endsWith('/admin')) {
      setIsAdminMode(true);
    }
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminMode(true);
    // Update URL query smoothly
    const url = new URL(window.location);
    url.searchParams.set('panel', 'admin');
    window.history.pushState({}, '', url);
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
    // Remove admin query param
    const url = new URL(window.location);
    url.searchParams.delete('panel');
    window.history.pushState({}, '', url);
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
