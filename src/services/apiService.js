/**
 * API Service for MySQL backend with Multi-Tenant / Slug support
 */

export const checkDbStatus = async () => {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) return { connected: false };
    return await res.json();
  } catch (e) {
    return { connected: false, message: 'Offline / local mode' };
  }
};

export const fetchRemoteData = async (slug = 'default') => {
  try {
    const res = await fetch(`/api/invitation/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (e) {
    return null;
  }
};

export const saveRemoteData = async (data, slug = 'default', client_password = null) => {
  try {
    const payload = { slug, data };
    if (client_password) payload.client_password = client_password;
    const res = await fetch(`/api/invitation/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const loginAuth = async ({ username, password, slug }) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, slug })
    });
    const json = await res.json();
    return { ok: res.ok, status: res.status, ...json };
  } catch (e) {
    return { ok: false, message: 'Gagal menghubungi server: ' + e.message };
  }
};

export const fetchRemoteWishes = async (slug = 'default') => {
  try {
    const res = await fetch(`/api/wishes?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.wishes || null;
  } catch (e) {
    return null;
  }
};

export const submitRemoteWish = async (wish, slug = 'default') => {
  try {
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...wish, slug })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const replyRemoteWish = async (id, reply) => {
  try {
    const res = await fetch('/api/wishes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, reply })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const deleteRemoteWish = async (id) => {
  try {
    const res = await fetch(`/api/wishes?id=${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const fetchAllInvitations = async () => {
  try {
    const res = await fetch('/api/invitations');
    if (!res.ok) return [];
    const json = await res.json();
    return json.invitations || [];
  } catch (e) {
    return [];
  }
};

export const fetchPlatformSettings = async () => {
  try {
    const res = await fetch('/api/platform/settings');
    if (!res.ok) return null;
    const json = await res.json();
    return json.settings || null;
  } catch (e) {
    return null;
  }
};

export const savePlatformSettings = async (settings) => {
  try {
    const res = await fetch('/api/platform/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};
