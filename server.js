const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const Database = require('better-sqlite3');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const PORT = 3721;

// ===== Express Setup =====
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== SQLite Database =====
const db = new Database(path.join(__dirname, 'highland.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    uploader TEXT NOT NULL,
    location TEXT DEFAULT '',
    lat REAL DEFAULT 0,
    lng REAL DEFAULT 0,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    caption TEXT DEFAULT ''
  );
`);

const insertMsg = db.prepare('INSERT INTO messages (username, text, timestamp) VALUES (?, ?, ?)');
const getMessages = db.prepare('SELECT * FROM messages ORDER BY id DESC LIMIT 100');
const insertPhoto = db.prepare('INSERT INTO photos (filename, uploader, location, lat, lng, timestamp, caption) VALUES (?, ?, ?, ?, ?, ?, ?)');
const getPhotos = db.prepare('SELECT * FROM photos ORDER BY id DESC');
const getPhotoById = db.prepare('SELECT * FROM photos WHERE id = ?');

// ===== Multer for Photo Upload =====
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `photo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'));
  }
});

// ===== Photo API =====
app.post('/api/photos', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { uploader, location, lat, lng, caption } = req.body;
    const timestamp = new Date().toISOString();
    const result = insertPhoto.run(
      req.file.filename,
      uploader || '匿名',
      location || '',
      parseFloat(lat) || 0,
      parseFloat(lng) || 0,
      timestamp,
      caption || ''
    );
    res.json({
      id: result.lastInsertRowid,
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      uploader: uploader || '匿名',
      location: location || '',
      lat: parseFloat(lat) || 0,
      lng: parseFloat(lng) || 0,
      timestamp,
      caption: caption || ''
    });
  } catch (e) {
    console.error('Photo upload error:', e);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/photos', (req, res) => {
  try {
    const photos = getPhotos.all().map(p => ({
      ...p,
      url: `/uploads/${p.filename}`
    }));
    res.json(photos);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

app.get('/api/photos/:id', (req, res) => {
  try {
    const photo = getPhotoById.get(parseInt(req.params.id));
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    photo.url = `/uploads/${photo.filename}`;
    res.json(photo);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
});

// ===== Weather API Proxy =====
let weatherCache = { data: null, timestamp: 0 };
const WEATHER_CACHE_MS = 30 * 60 * 1000; // 30 minutes

app.get('/api/weather', async (req, res) => {
  try {
    const now = Date.now();
    if (weatherCache.data && (now - weatherCache.timestamp) < WEATHER_CACHE_MS) {
      return res.json(weatherCache.data);
    }
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=56.82&longitude=-5.10&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/London&forecast_days=5';
    const response = await fetch(url);
    const data = await response.json();
    weatherCache = { data, timestamp: now };
    res.json(data);
  } catch (e) {
    console.error('Weather proxy error:', e);
    if (weatherCache.data) return res.json(weatherCache.data);
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

// ===== WebSocket Chat =====
const wss = new WebSocketServer({ server });
const onlineUsers = new Map(); // ws -> username

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg);
  });
}

function getOnlineList() {
  return [...new Set(onlineUsers.values())];
}

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      switch (msg.type) {
        case 'join': {
          onlineUsers.set(ws, msg.username);
          // Send history
          const history = getMessages.all().reverse();
          ws.send(JSON.stringify({ type: 'history', messages: history }));
          // Broadcast user list
          broadcast({ type: 'users', users: getOnlineList(), count: onlineUsers.size });
          // Broadcast join
          broadcast({ type: 'system', text: `${msg.username} 加入了聊天` });
          break;
        }
        case 'message': {
          const username = onlineUsers.get(ws) || '匿名';
          const timestamp = new Date().toISOString();
          insertMsg.run(username, msg.text, timestamp);
          broadcast({
            type: 'message',
            username,
            text: msg.text,
            timestamp
          });
          break;
        }
      }
    } catch (e) {
      console.error('WS message error:', e);
    }
  });

  ws.on('close', () => {
    const username = onlineUsers.get(ws);
    onlineUsers.delete(ws);
    if (username) {
      broadcast({ type: 'users', users: getOnlineList(), count: onlineUsers.size });
      broadcast({ type: 'system', text: `${username} 离开了聊天` });
    }
  });
});

// ===== Chat History API (fallback) =====
app.get('/api/messages', (req, res) => {
  try {
    const messages = getMessages.all().reverse();
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ===== Start Server =====
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🏔  Highland Explorer server running on http://0.0.0.0:${PORT}`);
  console.log(`   Static files: ${__dirname}`);
  console.log(`   Uploads: ${path.join(__dirname, 'uploads')}`);
  console.log(`   Database: ${path.join(__dirname, 'highland.db')}`);
});

// ===== Chips API =====
db.exec(`CREATE TABLE IF NOT EXISTS chips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL DEFAULT 1000,
  updated_at TEXT DEFAULT (datetime('now'))
)`);

db.exec(`CREATE TABLE IF NOT EXISTS chip_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_player TEXT,
  to_player TEXT,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
)`);

// Get all players and chips
app.get('/api/chips', (req, res) => {
  const players = db.prepare('SELECT * FROM chips ORDER BY amount DESC').all();
  const logs = db.prepare('SELECT * FROM chip_logs ORDER BY id DESC LIMIT 50').all();
  res.json({ players, logs });
});

// Add/join a player
app.post('/api/chips/join', (req, res) => {
  const { player, amount } = req.body;
  const initial = amount || 1000;
  try {
    db.prepare('INSERT OR IGNORE INTO chips (player, amount) VALUES (?, ?)').run(player, initial);
    const p = db.prepare('SELECT * FROM chips WHERE player = ?').get(player);
    db.prepare('INSERT INTO chip_logs (from_player, to_player, amount, type, note) VALUES (?, ?, ?, ?, ?)').run(null, player, initial, 'join', player + ' 加入游戏');
    broadcastChips();
    res.json(p);
  } catch(e) { res.status(400).json({ error: e.message }); }
});

// Transfer chips between players
app.post('/api/chips/transfer', (req, res) => {
  const { from, to, amount, note } = req.body;
  if (!from || !to || !amount || amount <= 0) return res.status(400).json({ error: '参数错误' });
  
  const sender = db.prepare('SELECT * FROM chips WHERE player = ?').get(from);
  if (!sender || sender.amount < amount) return res.status(400).json({ error: '筹码不足' });
  
  db.prepare('UPDATE chips SET amount = amount - ?, updated_at = datetime("now") WHERE player = ?').run(amount, from);
  db.prepare('UPDATE chips SET amount = amount + ?, updated_at = datetime("now") WHERE player = ?').run(amount, to);
  db.prepare('INSERT INTO chip_logs (from_player, to_player, amount, type, note) VALUES (?, ?, ?, ?, ?)').run(from, to, amount, 'transfer', note || '');
  
  broadcastChips();
  res.json({ success: true });
});

// Adjust chips (admin: add/deduct)
app.post('/api/chips/adjust', (req, res) => {
  const { player, amount, note } = req.body;
  if (!player || !amount) return res.status(400).json({ error: '参数错误' });
  
  db.prepare('UPDATE chips SET amount = amount + ?, updated_at = datetime("now") WHERE player = ?').run(amount, player);
  const type = amount > 0 ? 'add' : 'deduct';
  db.prepare('INSERT INTO chip_logs (from_player, to_player, amount, type, note) VALUES (?, ?, ?, ?, ?)').run(null, player, Math.abs(amount), type, note || '');
  
  broadcastChips();
  res.json({ success: true });
});

// Reset all
app.post('/api/chips/reset', (req, res) => {
  db.prepare('DELETE FROM chips').run();
  db.prepare('DELETE FROM chip_logs').run();
  broadcastChips();
  res.json({ success: true });
});

// Broadcast chip updates via WebSocket
function broadcastChips() {
  const players = db.prepare('SELECT * FROM chips ORDER BY amount DESC').all();
  const logs = db.prepare('SELECT * FROM chip_logs ORDER BY id DESC LIMIT 20').all();
  const msg = JSON.stringify({ type: 'chips', players, logs });
  wss.clients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}
