import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (limit 50mb untuk menampung gambar/audio yang dikompresi)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database Connection Pool (MySQL / MariaDB aaPanel)
let pool = null;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'undangan_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4'
    });
  }
  return pool;
};

// Inisialisasi Tabel Otomatis saat Server Start
const initDatabase = async () => {
  try {
    const db = getPool();
    // Test koneksi
    const conn = await db.getConnection();
    console.log('✅ Berhasil terhubung ke Database MySQL aaPanel!');
    conn.release();

    // 1. Tabel pengaturan & data undangan
    await db.query(`
      CREATE TABLE IF NOT EXISTS invitation_settings (
        id VARCHAR(50) PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Tabel ucapan & doa tamu (Wishes)
    await db.query(`
      CREATE TABLE IF NOT EXISTS wishes (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        relation VARCHAR(100) DEFAULT 'Tamu',
        attendance VARCHAR(50) NOT NULL,
        pax INT DEFAULT 1,
        message TEXT NOT NULL,
        reply TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Tabel daftar tamu undangan (Buku Tamu)
    await db.query(`
      CREATE TABLE IF NOT EXISTS guests (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        category VARCHAR(50) DEFAULT 'Umum',
        sent BOOLEAN DEFAULT FALSE,
        sent_at VARCHAR(100),
        checked_in BOOLEAN DEFAULT FALSE,
        check_in_time VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('✅ Seluruh tabel database (invitation_settings, wishes, guests) siap digunakan.');
  } catch (err) {
    console.error('⚠️ Peringatan koneksi database:', err.message);
    console.error('Pastikan konfigurasi DB_HOST, DB_USER, DB_PASSWORD, DB_NAME di file .env sudah sesuai dengan database di aaPanel.');
  }
};

// ================= API ENDPOINTS ================= //

// 1. Status Database
app.get('/api/status', async (req, res) => {
  try {
    const db = getPool();
    await db.query('SELECT 1');
    return res.json({
      connected: true,
      provider: 'mysql',
      message: 'Terhubung ke Database MySQL lokal di aaPanel!'
    });
  } catch (error) {
    return res.status(200).json({
      connected: false,
      provider: 'offline',
      message: error.message
    });
  }
});

// 2. Data Undangan (GET & POST)
app.get('/api/invitation', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT data FROM invitation_settings WHERE id = "main" LIMIT 1');
    if (rows && rows.length > 0) {
      let parsedData = null;
      try {
        parsedData = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
      } catch (e) {
        parsedData = rows[0].data;
      }
      return res.json({ source: 'mysql', connected: true, data: parsedData });
    }
    return res.json({ source: 'mysql', connected: true, data: null });
  } catch (error) {
    console.error('GET /api/invitation Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/invitation', async (req, res) => {
  try {
    const db = getPool();
    let payload = req.body;
    const jsonString = typeof payload === 'string' ? payload : JSON.stringify(payload);

    await db.query(`
      INSERT INTO invitation_settings (id, data, updated_at)
      VALUES ('main', ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP
    `, [jsonString]);

    return res.json({ success: true, message: 'Data undangan berhasil disimpan di Database!' });
  } catch (error) {
    console.error('POST /api/invitation Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// 3. Ucapan & Doa Tamu (GET, POST, PUT, DELETE)
app.get('/api/wishes', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM wishes ORDER BY created_at DESC');
    return res.json({ source: 'mysql', wishes: rows });
  } catch (error) {
    console.error('GET /api/wishes Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/wishes', async (req, res) => {
  try {
    const db = getPool();
    const { id, name, relation, attendance, pax, message } = req.body;
    const wishId = id || 'w-' + Date.now();

    await db.query(`
      INSERT INTO wishes (id, name, relation, attendance, pax, message)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        relation = VALUES(relation),
        attendance = VALUES(attendance),
        pax = VALUES(pax),
        message = VALUES(message)
    `, [wishId, name || 'Tamu', relation || 'Tamu', attendance || 'hadir', pax || 1, message || '']);

    return res.status(201).json({ success: true, id: wishId });
  } catch (error) {
    console.error('POST /api/wishes Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.put('/api/wishes', async (req, res) => {
  try {
    const db = getPool();
    const { id, reply } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });

    await db.query('UPDATE wishes SET reply = ? WHERE id = ?', [reply || '', id]);
    return res.json({ success: true });
  } catch (error) {
    console.error('PUT /api/wishes Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/wishes', async (req, res) => {
  try {
    const db = getPool();
    const id = req.query.id || req.body?.id;
    if (!id) return res.status(400).json({ error: 'Missing id parameter' });

    await db.query('DELETE FROM wishes WHERE id = ?', [id]);
    return res.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/wishes Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// ================= SERVE STATIC FRONTEND (Vite dist) ================= //
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback: semua route seperti /admin dialihkan ke dist/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server Undangan Digital berjalan di port ${PORT}`);
  await initDatabase();
});
