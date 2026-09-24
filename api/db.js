import { neon } from '@neondatabase/serverless';

export const getDb = () => {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    return null;
  }
  return neon(databaseUrl);
};

export const initTablesIfNeed = async (sql) => {
  if (!sql) return;

  try {
    // 1. Table for general invitation data (stores JSON settings)
    await sql`
      CREATE TABLE IF NOT EXISTS invitation_settings (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 2. Table for guest wishes & RSVP
    await sql`
      CREATE TABLE IF NOT EXISTS wishes (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        relation VARCHAR(100),
        attendance VARCHAR(50) NOT NULL,
        pax INT DEFAULT 1,
        message TEXT NOT NULL,
        reply TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 3. Table for guests list (Buku Tamu)
    await sql`
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
      )
    `;
  } catch (error) {
    console.error('Error creating Neon tables:', error);
  }
};
