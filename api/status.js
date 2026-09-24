import { getDb, initTablesIfNeed } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = getDb();
  if (!sql) {
    return res.status(200).json({ 
      connected: false, 
      provider: 'local',
      message: 'DATABASE_URL belum dikonfigurasi di Environment Variables Vercel.' 
    });
  }

  try {
    await initTablesIfNeed(sql);
    const testResult = await sql`SELECT 1 as test`;
    if (testResult && testResult[0]?.test === 1) {
      return res.status(200).json({
        connected: true,
        provider: 'neon',
        message: 'Terhubung ke Neon Tech Serverless PostgreSQL!'
      });
    }
    return res.status(200).json({ connected: false, provider: 'error' });
  } catch (error) {
    return res.status(500).json({ connected: false, error: error.message });
  }
}
