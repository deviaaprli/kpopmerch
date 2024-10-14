const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
// Buat instance express
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.json());

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

// Endpoint untuk login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username dan password harus diisi'
    });
  }

  const query = `SELECT * FROM userdata WHERE username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error pada database'
      });
    }

    if (results.length > 0) {
      const user = results[0];

      // Compare the hashed password with the provided password
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error pada saat memeriksa password'
          });
        }

        if (match) {
          // If password matches, generate a token
          const token = jwt.sign({ userId: user.user_id }, 'your-secret-key', { expiresIn: '1h' }); // Expiry time for better security

          if (user.peran === 'Admin' || user.peran === 'Buyer') {
            res.json({
              success: true,
              message: 'Login berhasil',
              token,
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
          res.status(401).json({
            success: false,
            message: 'Username atau password tidak valid'
          });
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Username atau password tidak valid'
      });
    }
  });
});

// Endpoint untuk logout
app.post('/api/logout', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token missing',
    });
  }

  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    res.json({
      success: true,
      message: 'Logout berhasil',
    });
  });
});


//Endpoint data Account

// Endpoint untuk memeriksa email
app.post('/api/check-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email harus diisi' });
  }

  const query = 'SELECT * FROM userdata WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error pada database' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Email terdaftar' });
    } else {
      res.json({ success: false, message: 'Email tidak terdaftar' });
    }
  });
});

// Endpoint untuk memperbarui password
app.put('/api/update-password', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email dan password baru harus diisi' });
  }

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const updateQuery = 'UPDATE userdata SET password = ?, waktu_diubah = NOW() WHERE email = ?';
  
  db.query(updateQuery, [hashedPassword, email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Database update error', error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Email tidak ditemukan' });
    }

    res.json({ success: true, message: 'Password berhasil diperbarui' });
  });
});


// Endpoint untuk menambahkan user baru
app.post('/api/add-user', async (req, res) => {
  const { username, password, email, peran } = req.body;

  if (peran !== 'Buyer') {
    return res.status(400).json({ success: false, message: 'Cannot add users with admin role' });
  }

  const checkQuery = 'SELECT * FROM userdata WHERE username = ?';
  db.query(checkQuery, [username], async (err, results) => {
    if (err) {
      return res.status(500).send('Database query error');
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO userdata (username, password, email, peran, waktu_dibuat, waktu_diubah) VALUES (?, ?, ?, ?, NOW(), NOW())';
    db.query(insertQuery, [username, hashedPassword, email, peran], (err, results) => {
      if (err) {
        return res.status(500).send('Database insert error');
      }

      res.json({ success: true, message: 'User added successfully' });
    });
  });
});

// Endpoint untuk update user
app.put('/api/update-user', (req, res) => {
  const { user_id, username, password, email } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  const updatedData = {
    username: req.body.username, 
    password: req.body.password, 
    email: req.body.email
  };

  const updateQuery = `
    UPDATE userdata 
    SET 
      username = ?,
      password = ?,
      email = ?,
      waktu_diubah = NOW() 
    WHERE 
      user_id = ?`;
  
  const values = [
    updatedData.username,
    updatedData.password,
    updatedData.email,
    user_id,
  ];

  // Jalankan query untuk memperbarui data pengguna
  db.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Database update error', error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User profile updated successfully' });
  });
});

// Endpoint Setting Alamat

// Endpoint untuk mendapatkan detail alamat berdasarkan user_id
app.get('/user/:user_id/addresses', (req, res) => {
    const userId = req.params.user_id;

    const query = `
        SELECT ad.address_id, ad.nama_penerima, ad.nomor_telepon, ad.provinsi, ad.kota, ad.kecamatan, ad.kelurahan, ad.alamat, ad.kode_pos
        FROM accountdata ac
        JOIN addressdata ad ON ac.address_id = ad.address_id
        WHERE ac.user_id = ?
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length > 0) {
            res.json({
                user_id: userId,
                address_count: result.length,
                addresses: result // Mengembalikan semua detail alamat
            });
        } else {
            res.json({ user_id: userId, address_count: 0, addresses: [] });
        }
    });
});

// Endpoint ALAMAT

// Endpoint untuk menampilkan semua alamat
app.get('/api/alamat', (req, res) => {
  const query = `
      SELECT * FROM addressdata
  `;

  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({
              success: false,
              message: 'Gagal mengambil data alamat',
              error: err.message
          });
      }

      if (results.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'Tidak ada data alamat ditemukan'
          });
      }

      res.json({
          success: true,
          message: 'Data alamat berhasil diambil',
          data: results
      });
  });
});


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

  const query = `
      INSERT INTO addressdata (nama_penerima, nomor_telepon, provinsi, kota, kecamatan, kelurahan, alamat, kode_pos, waktu_dibuat, waktu_diubah)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

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

// Endpoint untuk mengupdate alamat
app.put('/api/update-alamat/:id', (req, res) => {
  const { id } = req.params;
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

  const query = `
      UPDATE addressdata
      SET nama_penerima = ?, 
          nomor_telepon = ?, 
          provinsi = ?, 
          kota = ?, 
          kecamatan = ?, 
          kelurahan = ?, 
          alamat = ?, 
          kode_pos = ?, 
          waktu_diubah = NOW()
      WHERE address_id = ?
  `;

  db.query(query, [nama_penerima, nomor_telepon, provinsi, kota, kecamatan, kelurahan, alamat, kode_pos, id], (err, result) => {
      if (err) {
          return res.status(500).json({
              success: false,
              message: 'Gagal mengupdate alamat',
              error: err.message
          });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({
              success: false,
              message: 'Alamat tidak ditemukan'
          });
      }

      res.json({
          success: true,
          message: 'Alamat berhasil diupdate',
          data: {
              address_id: id,
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

// Endpoint untuk menghapus alamat
app.delete('/api/delete-alamat/:id', (req, res) => {
  const { id } = req.params;

  const query = `
      DELETE FROM addressdata
      WHERE address_id = ?
  `;

  db.query(query, [id], (err, result) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Error deleting address' });
      }

      if (result.affectedRows > 0) {
          return res.status(200).json({ success: true, message: 'Address deleted successfully' });
      } else {
          return res.status(404).json({ success: false, message: 'Address not found' });
      }
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
