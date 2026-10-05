const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    const configuredOrigins = (process.env.FRONTEND_URL || '')
      .split(',')
      .map(url => url.trim().replace(/\/$/, ''))
      .filter(Boolean);

    const isAllowed =
      configuredOrigins.length === 0 ||
      configuredOrigins.includes('*') ||
      configuredOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost');

    if (isAllowed) {
      return callback(null, true);
    }
    
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// --- Database Connection ---
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : false
    })
  : null;

if (!pool) {
  console.warn('⚠️ No DATABASE_URL provided. Running in memory/demo mode.');
} else {
  console.log('✅ PostgreSQL database configured.');
}

const demo = [];

// --- Validation Helper ---
const validate = (b) => {
  const e = [];
  if (!b.name?.trim()) e.push('Name is required');
  if (!/^\S+@\S+\.\S+$/.test(b.email || '')) e.push('Valid email is required');
  if (b.phone && !/^[+\d\s().-]{7,25}$/.test(b.phone)) e.push('Valid phone is required');
  if (!b.message?.trim()) e.push('Message is required');
  return e;
};

// --- Endpoints ---

// Health Check (Used by Render/Vercel to verify deployment)
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    database: Boolean(pool), 
    environment: process.env.NODE_ENV || 'development' 
  });
});

// GET all submissions
app.get('/api/submissions', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!pool) {
      const rows = q 
        ? demo.filter(x => Object.values(x).join(' ').toLowerCase().includes(q.toLowerCase())) 
        : demo;
      return res.json(rows);
    }
    
    const { rows } = q 
      ? await pool.query(
          'SELECT * FROM submissions WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR message ILIKE $1 ORDER BY created_at DESC', 
          [`%${q}%`]
        )
      : await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
      
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

// GET single submission
app.get('/api/submissions/:id', async (req, res, next) => {
  try {
    if (!pool) {
      const item = demo.find(x => String(x.id) === req.params.id);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    const { rows } = await pool.query('SELECT * FROM submissions WHERE id=$1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    next(e);
  }
});

// POST create submission
app.post('/api/submissions', async (req, res, next) => {
  try {
    const e = validate(req.body);
    if (e.length) return res.status(400).json({ errors: e });
    
    const { name, email, phone = '', message } = req.body;
    
    if (!pool) {
      const x = { 
        id: Date.now(), 
        name: name.trim(), 
        email: email.trim(), 
        phone: phone.trim(), 
        message: message.trim(), 
        created_at: new Date().toISOString(), 
        updated_at: new Date().toISOString() 
      };
      demo.unshift(x);
      return res.status(201).json(x);
    }
    
    const { rows } = await pool.query(
      'INSERT INTO submissions(name, email, phone, message) VALUES($1, $2, $3, $4) RETURNING *',
      [name.trim(), email.trim(), phone.trim(), message.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    next(e);
  }
});

// PUT update submission
app.put('/api/submissions/:id', async (req, res, next) => {
  try {
    const e = validate(req.body);
    if (e.length) return res.status(400).json({ errors: e });
    
    const { name, email, phone = '', message } = req.body;
    
    if (!pool) {
      const i = demo.findIndex(x => String(x.id) === req.params.id);
      if (i < 0) return res.status(404).json({ error: 'Not found' });
      demo[i] = { 
        ...demo[i], 
        name: name.trim(), 
        email: email.trim(), 
        phone: phone.trim(), 
        message: message.trim(), 
        updated_at: new Date().toISOString() 
      };
      return res.json(demo[i]);
    }
    
    const { rows } = await pool.query(
      'UPDATE submissions SET name=$1, email=$2, phone=$3, message=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
      [name.trim(), email.trim(), phone.trim(), message.trim(), req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    next(e);
  }
});

// DELETE submission
app.delete('/api/submissions/:id', async (req, res, next) => {
  try {
    if (!pool) {
      const i = demo.findIndex(x => String(x.id) === req.params.id);
      if (i < 0) return res.status(404).json({ error: 'Not found' });
      demo.splice(i, 1);
      return res.status(204).send();
    }
    const result = await pool.query('DELETE FROM submissions WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message || err);
  res.status(500).json({ 
    error: 'Internal server error', 
    details: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// --- Server Startup ---
// Condition ensures Render runs it directly, but Vercel treats it as a serverless function export
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
}

module.exports = app;