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
const PORT = process.env.PORT || 3001;

// Middleware (limit 50mb untuk foto prewed / audio base64)
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
    const conn = await db.getConnection();
    console.log('✅ Berhasil terhubung ke Database MySQL aaPanel!');
    conn.release();

    // 1. Tabel utama undangan multi-klien (berdasarkan SLUG URL unik)
    await db.query(`
      CREATE TABLE IF NOT EXISTS invitations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255),
        theme_id VARCHAR(50) DEFAULT 'sage-botanical',
        data LONGTEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Tabel ucapan & doa tamu (Wishes) dengan isolasi invitation_slug
    await db.query(`
      CREATE TABLE IF NOT EXISTS wishes (
        id VARCHAR(100) PRIMARY KEY,
        invitation_slug VARCHAR(100) DEFAULT 'default',
        name VARCHAR(255) NOT NULL,
        relation VARCHAR(100) DEFAULT 'Tamu',
        attendance VARCHAR(50) NOT NULL,
        pax INT DEFAULT 1,
        message TEXT NOT NULL,
        reply TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Tambah kolom invitation_slug jika tabel wishes lama sudah ada
    try {
      await db.query(`ALTER TABLE wishes ADD COLUMN invitation_slug VARCHAR(100) DEFAULT 'default'`);
    } catch (e) {
      // Kolom sudah ada
    }

    // 3. Tabel daftar tamu undangan (Buku Tamu) dengan isolasi invitation_slug
    await db.query(`
      CREATE TABLE IF NOT EXISTS guests (
        id VARCHAR(100) PRIMARY KEY,
        invitation_slug VARCHAR(100) DEFAULT 'default',
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

    try {
      await db.query(`ALTER TABLE guests ADD COLUMN invitation_slug VARCHAR(100) DEFAULT 'default'`);
    } catch (e) {
      // Kolom sudah ada
    }

    // 4. Tabel Pengaturan Platform / Landing Page Komersial
    await db.query(`
      CREATE TABLE IF NOT EXISTS platform_settings (
        id VARCHAR(50) PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Backward Compatibility & Sinkronisasi data lama dari tabel invitation_settings
    try {
      const [oldRows] = await db.query(`SELECT data FROM invitation_settings WHERE id = 'main' LIMIT 1`);
      if (oldRows && oldRows.length > 0) {
        const oldData = oldRows[0].data;
        await db.query(`
          INSERT INTO invitations (slug, title, data)
          VALUES ('default', 'Undangan Utama', ?), ('ipi-seli', 'The Wedding of Ipi & Seli', ?)
          ON DUPLICATE KEY UPDATE data = VALUES(data)
        `, [oldData, oldData]);
        console.log('🔄 Data lama tersinkronisasi ke slug "default" & "ipi-seli".');
      }
    } catch (e) {
      // Abaikan jika tabel lama belum ada
    }

    console.log('✅ Seluruh tabel database multi-undangan (invitations, wishes, guests, platform_settings) siap digunakan.');
  } catch (err) {
    console.error('⚠️ Peringatan database:', err.message);
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

// 2. List Semua Undangan Klien (Untuk Admin / Katalog)
app.get('/api/invitations', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT id, slug, title, theme_id, created_at, updated_at FROM invitations ORDER BY updated_at DESC');
    return res.json({ success: true, count: rows.length, invitations: rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 2b. Pengaturan Landing Page & Komersial (Katalog, Harga, Kontak WA, Hero)
app.get('/api/platform/settings', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT data FROM platform_settings WHERE id = "landing" LIMIT 1');
    if (rows && rows.length > 0) {
      const data = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
      return res.json({ success: true, settings: data });
    }
    return res.json({ success: true, settings: null });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/platform/settings', async (req, res) => {
  try {
    const db = getPool();
    const payload = req.body.settings || req.body;
    const jsonStr = typeof payload === 'string' ? payload : JSON.stringify(payload);

    await db.query(`
      INSERT INTO platform_settings (id, data, updated_at)
      VALUES ('landing', ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP
    `, [jsonStr]);

    return res.json({ success: true, message: 'Pengaturan Landing Page berhasil disimpan!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Ambil Data Undangan berdasarkan Slug (Contoh: /api/invitation/ipi-seli atau /api/invitation/febri-ananta)
app.get('/api/invitation/:slug?', async (req, res) => {
  const slug = req.params.slug || req.query.slug || 'default';
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT slug, title, theme_id, data FROM invitations WHERE slug = ? LIMIT 1', [slug]);
    if (rows && rows.length > 0) {
      let parsedData = null;
      try {
        parsedData = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
      } catch (e) {
        parsedData = rows[0].data;
      }
      return res.json({ 
        source: 'mysql', 
        connected: true, 
        slug: rows[0].slug, 
        title: rows[0].title, 
        theme_id: rows[0].theme_id, 
        data: parsedData 
      });
    }

    // Jika belum ada di tabel invitations, coba fallback ke invitation_settings lama
    if (slug === 'default' || slug === 'main') {
      try {
        const [oldRows] = await db.query('SELECT data FROM invitation_settings WHERE id = "main" LIMIT 1');
        if (oldRows && oldRows.length > 0) {
          const parsed = typeof oldRows[0].data === 'string' ? JSON.parse(oldRows[0].data) : oldRows[0].data;
          return res.json({ source: 'mysql', connected: true, slug: 'default', data: parsed });
        }
      } catch (e) {}
    }

    return res.json({ source: 'mysql', connected: true, slug, data: null });
  } catch (error) {
    console.error('GET /api/invitation Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// 4. Simpan / Update Data Undangan berdasarkan Slug
app.post('/api/invitation/:slug?', async (req, res) => {
  const slug = req.params.slug || req.body.slug || req.query.slug || 'default';
  try {
    const db = getPool();
    let payload = req.body.data || req.body;
    const title = payload.meta?.title || `The Wedding of ${payload.couple?.groom?.nickName || ''} & ${payload.couple?.bride?.nickName || ''}`;
    const themeId = payload.meta?.activeTheme || 'sage-botanical';
    const jsonString = typeof payload === 'string' ? payload : JSON.stringify(payload);

    await db.query(`
      INSERT INTO invitations (slug, title, theme_id, data, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE 
        title = VALUES(title),
        theme_id = VALUES(theme_id),
        data = VALUES(data),
        updated_at = CURRENT_TIMESTAMP
    `, [slug, title, themeId, jsonString]);

    return res.json({ 
      success: true, 
      slug, 
      message: `Data undangan "${slug}" berhasil disimpan di Database!` 
    });
  } catch (error) {
    console.error('POST /api/invitation Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// 5. Ucapan & Doa Tamu (Terkunci ke Slug Masing-Masing Pasangan)
app.get('/api/wishes', async (req, res) => {
  const slug = req.query.slug || 'default';
  try {
    const db = getPool();
    const [rows] = await db.query(
      'SELECT * FROM wishes WHERE invitation_slug = ? OR (? = "default" AND invitation_slug IS NULL) ORDER BY created_at DESC', 
      [slug, slug]
    );
    return res.json({ source: 'mysql', slug, wishes: rows });
  } catch (error) {
    console.error('GET /api/wishes Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/wishes', async (req, res) => {
  const slug = req.body.slug || req.query.slug || 'default';
  try {
    const db = getPool();
    const { id, name, relation, attendance, pax, message } = req.body;
    const wishId = id || 'w-' + Date.now();

    await db.query(`
      INSERT INTO wishes (id, invitation_slug, name, relation, attendance, pax, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        relation = VALUES(relation),
        attendance = VALUES(attendance),
        pax = VALUES(pax),
        message = VALUES(message)
    `, [wishId, slug, name || 'Tamu', relation || 'Tamu', attendance || 'hadir', pax || 1, message || '']);

    return res.status(201).json({ success: true, id: wishId, slug });
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
    return res.status(500).json({ error: error.message });
  }
});

// ================= SERVE STATIC FRONTEND (Vite dist) ================= //
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback: semua rute seperti /:slug atau /:slug/admin dialihkan ke dist/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server Undangan Digital Multi-Tenant berjalan di port ${PORT}`);
  await initDatabase();
});
