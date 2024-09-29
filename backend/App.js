const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Buat instance express
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'kpopmerch', 
  port: 3306,
});

// Cek koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

// API Endpoint untuk mendapatkan data dari tabel users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM userdata';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//Endpoint Add Login / SignUp

// Endpoint untuk menambahkan user baru
app.post('/api/add-user', (req, res) => {
  const { username, password, peran } = req.body;

  // Validation: only adding Buyer (not Admin)
  if (peran !== 'Buyer') {
    return res.status(400).json({ success: false, message: 'Cannot add users with admin role' });
  }

  // Check if Username already exists in the database
  const checkQuery = 'SELECT * FROM userdata WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Database query error');
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // If username is unique, proceed with insertion
    const insertQuery = 'INSERT INTO userdata (username, password, email, peran, waktu_dibuat, waktu_diubah) VALUES (?, ?, ?, ?, NOW(), NOW())';
    db.query(insertQuery, [username, password, peran], (err, results) => {
      if (err) {
        return res.status(500).send('Database insert error');
      }

      res.json({ success: true, message: 'User added successfully' });
    });
  });
});

// Endpoint untuk login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Cek apakah username dan password sudah diisi
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username dan password harus diisi'
    });
  }

  // Query untuk memeriksa user berdasarkan username dan password
  const query = `SELECT * FROM userdata WHERE username = ? AND password = ?`;

  // Eksekusi query
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error pada database'
      });
    }

    // Jika user ditemukan
    if (results.length > 0) {
      const user = results[0];
      
      // Cek peran dari user
      if (user.peran === 'Admin' || user.peran === 'Buyer') {
        res.json({
          success: true,
          message: 'Login berhasil',
          data: {
            user_id: user.user_id,
            username: user.username,
            peran: user.peran
          }
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Peran tidak diizinkan'
        });
      }
    } else {
      // Jika username atau password salah
      res.status(401).json({
        success: false,
        message: 'Username atau password tidak valid'
      });
    }
  });
});

// Endpoint ALAMAT

// Endpoint untuk menambahkan alamat
app.post('/api/add-alamat', (req, res) => {
  const {
      nama_penerima,
      nomor_telepon,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      alamat,
      kode_pos
  } = req.body;

  // Query untuk menambahkan alamat
  const query = `
      INSERT INTO addressdata (nama_penerima, nomor_telepon, provinsi, kota, kecamatan, kelurahan, alamat, kode_pos, waktu_dibuat, waktu_diubah)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  // Eksekusi query
  db.query(query, [nama_penerima, nomor_telepon, provinsi, kota, kecamatan, kelurahan, alamat, kode_pos], (err, result) => {
      if (err) {
          return res.status(500).json({
              success: false,
              message: 'Gagal menambahkan alamat',
              error: err.message
          });
      }

      res.json({
          success: true,
          message: 'Alamat berhasil ditambahkan',
          data: {
              address_id: result.insertId,
              nama_penerima,
              nomor_telepon,
              provinsi,
              kota,
              kecamatan,
              kelurahan,
              alamat,
              kode_pos
          }
      });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
