/**
 * API Service for Neon PostgreSQL backend (with graceful offline fallback)
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

export const fetchRemoteData = async () => {
  try {
    const res = await fetch('/api/invitation');
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (e) {
    return null;
  }
};

export const saveRemoteData = async (data) => {
  try {
    const res = await fetch('/api/invitation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const fetchRemoteWishes = async () => {
  try {
    const res = await fetch('/api/wishes');
    if (!res.ok) return null;
    const json = await res.json();
    return json.wishes || null;
  } catch (e) {
    return null;
  }
};

export const submitRemoteWish = async (wish) => {
  try {
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish)
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
