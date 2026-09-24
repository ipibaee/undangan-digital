import { getDb, initTablesIfNeed } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = getDb();
  if (!sql) {
    return res.status(200).json({ source: 'local', connected: false });
  }

  try {
    await initTablesIfNeed(sql);

    // GET all wishes
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM wishes ORDER BY created_at DESC`;
      return res.status(200).json({ source: 'neon', wishes: rows });
    }

    // POST new wish
    if (req.method === 'POST') {
      const { id, name, relation, attendance, pax, message } = req.body;
      const wishId = id || 'w-' + Date.now();
      await sql`
        INSERT INTO wishes (id, name, relation, attendance, pax, message)
        VALUES (${wishId}, ${name}, ${relation || 'Tamu'}, ${attendance}, ${pax || 1}, ${message})
      `;
      return res.status(201).json({ success: true, id: wishId });
    }

    // PUT reply to a wish
    if (req.method === 'PUT') {
      const { id, reply } = req.body;
      await sql`
        UPDATE wishes SET reply = ${reply} WHERE id = ${id}
      `;
      return res.status(200).json({ success: true });
    }

    // DELETE a wish
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`
        DELETE FROM wishes WHERE id = ${id}
      `;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Wishes Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
