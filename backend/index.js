const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3001;
const db = new sqlite3.Database("./data.sqlite", (err) => {
  if (err) {
    console.error('Failed to open SQLite database:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT,
      fullName TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      amount REAL,
      date TEXT,
      description TEXT
    )
  `);
});

app.post('/api/register', (req, res) => {
  const { username, password, email, fullName } = req.body;

  if (!username || !password || !email || !fullName) {
    return res.status(400).json({ message: 'Missing registration fields' });
  }

  const stmt = db.prepare(
    'INSERT INTO users (username, password, email, fullName) VALUES (?, ?, ?, ?)'
  );

  stmt.run(username, password, email, fullName, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({
      id: this.lastID,
      username,
      email,
      fullName,
    });
  });

  stmt.finalize();
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing login fields' });
  }

  db.get(
    'SELECT id, username, email, fullName FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      res.json(user);
    }
  );
});

app.get('/api/expenses', (req, res) => {
  db.all(
    'SELECT id, name, amount, date, description FROM expenses ORDER BY date DESC',
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(rows);
    }
  );
});

app.post('/api/expenses', (req, res) => {
  const { name, amount, date, description } = req.body;

  if (!name || !amount || !date) {
    return res.status(400).json({ message: 'Missing expense fields' });
  }

  const stmt = db.prepare(
    'INSERT INTO expenses (name, amount, date, description) VALUES (?, ?, ?, ?)'
  );

  stmt.run(name, amount, date, description || '', function (err) {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    db.get(
      'SELECT id, name, amount, date, description FROM expenses WHERE id = ?',
      [this.lastID],
      (err, expense) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json(expense);
      }
    );
  });

  stmt.finalize();
});

app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { name, amount, date, description } = req.body;

  if (!name || !amount || !date) {
    return res.status(400).json({ message: 'Missing expense fields' });
  }

  db.run(
    'UPDATE expenses SET name = ?, amount = ?, date = ?, description = ? WHERE id = ?',
    [name, amount, date, description || '', id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      db.get(
        'SELECT id, name, amount, date, description FROM expenses WHERE id = ?',
        [id],
        (err, expense) => {
          if (err) {
            return res.status(500).json({ message: 'Database error' });
          }
          res.json(expense);
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
