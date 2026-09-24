import { getDb, initTablesIfNeed } from './db.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = getDb();

  // If Neon database is not configured yet
  if (!sql) {
    return res.status(200).json({ 
      source: 'local', 
      connected: false,
      message: 'DATABASE_URL belum diatur di Vercel. Menggunakan mode penyimpanan lokal browser.' 
    });
  }

  try {
    await initTablesIfNeed(sql);

    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM invitation_settings WHERE id = 'main' LIMIT 1`;
      if (rows.length > 0) {
        return res.status(200).json({ source: 'neon', connected: true, data: rows[0].data });
      }
      return res.status(200).json({ source: 'neon', connected: true, data: null });
    }

    if (req.method === 'POST') {
      const payload = req.body;
      await sql`
        INSERT INTO invitation_settings (id, data, updated_at)
        VALUES ('main', ${JSON.stringify(payload)}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE
        SET data = ${JSON.stringify(payload)}, updated_at = CURRENT_TIMESTAMP
      `;
      return res.status(200).json({ success: true, message: 'Data berhasil disimpan di Neon Tech PostgreSQL!' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
