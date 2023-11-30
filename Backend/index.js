const express = require('express');
const app = express();
const { Client } = require('pg');
const bp = require('body-parser');
const multer = require('multer');
const session = require('express-session');
require('dotenv').config();

const db = new Client({
    user: 'mohammadvarrel23',
    host: 'ep-polished-water-013849.ap-southeast-1.aws.neon.tech',
    database: 'ApplyJob',
    password: 'n2GKNID3iWsS',
    port: 5432,
    sslmode: 'require',
    ssl: true
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database Project');
    }
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));

const storage = multer.memoryStorage();

// function pdfFilter(req, file, cb) {
//   const allowedTypes = ['application/pdf'];

//   if (!allowedTypes.includes(file.mimetype)) {
//     const error = new Error('Only PDF files are allowed!');
//     error.code = 'LIMIT_FILE_TYPES';
//     return cb(error, false);
//   }
//   cb(null, true);
// }

const upload = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   fileFilter: pdfFilter
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5 MB (dalam byte)
//   },
// });

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));



app.post('/login', async (req, res) => { //Login khusus user
    const { nama, password } = req.body;
  
    if (!nama || !password) {
      return res.status(400).send('Invalid request');
    }
  
    const query = 'SELECT id, nama, role, password FROM account WHERE nama = $1;';
    db.query(query, [nama], (err, results) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.rowCount < 1) {
        return res.status(401).send('Nama salah'); 
      }
  
      const storedPassword = results.rows[0].password;
      const userRole = results.rows[0].role;
  
      if (password === storedPassword) {
        if (userRole === 'User') {
          return res.status(200).json({
            message: 'Login successful (User)',
            user_id: results.rows[0].id,
          });
        } else if (userRole === 'Admin') {
          return res.status(401).send('Hanya user yang dapat login');
        }
      }
      return res.status(401).send('Password salah');
    });
});


app.get('/check_all_account', (req, res) => {
    if (req.session && req.session.role === 'Admin') {
      const query = 'SELECT * FROM account;';
      db.query(query, (err, allAccountsResults) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Internal Server Error');
        }
  
        return res.send({ all_accounts: allAccountsResults.rows });
      });
    } else {
      return res.status(403).send('Hanya admin yang dapat mengakses');
    }
});
  
app.post('/apply_job', upload.single('file_upload'), async (req, res) => {
  try {
    const { nama, tanggal_lahir } = req.body;
    const fileUpload = req.file ? req.file.buffer : null;

    if (!nama || !tanggal_lahir || !fileUpload) {
      return res.status(400).json({ error: 'Nama, tanggal_lahir, dan file_upload harus diisi' });
    }

    const query = 'INSERT INTO account (nama, role, password, tanggal_lahir, file_upload) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nama, 'User', 'random_password', tanggal_lahir, fileUpload];

    const result = await db.query(query, values);
    const insertedData = result.rows[0];

    res.status(201).json({ message: 'Apply job successful', data: insertedData });
  } catch (error) {
    console.error(error);

    if (error.code === '23505') {
      return res.status(400).json({ error: 'Nama sudah digunakan, pilih nama yang lain' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// app.post('/apply_job', upload.single('file_upload'), async (req, res) => {
//   try {
//     const { nama, tanggal_lahir } = req.body;
//     const fileUpload = req.file ? req.file.buffer : null;

//     if (!nama || !tanggal_lahir || !fileUpload) {
//       return res.status(400).json({ error: 'Nama, tanggal_lahir, dan file_upload harus diisi' });
//     }

//     // Simpan data ke database
//     const query = 'INSERT INTO account (nama, role, password, tanggal_lahir, file_upload) VALUES ($1, $2, $3, $4, $5) RETURNING *';
//     const values = [nama, 'User', 'random_password', tanggal_lahir, fileUpload];

//     const result = await db.query(query, values);
//     const insertedData = result.rows[0];

//     res.status(201).json({ message: 'Apply job successful', data: insertedData });
//   } catch (error) {
//     console.error(error);

//     // Tambahkan penanganan kesalahan yang lebih spesifik
//     if (error.code === '23505') {
//       return res.status(400).json({ error: 'Nama sudah digunakan, pilih nama yang lain' });
//     } else {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// });

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + './server.html');
// });

app.listen(3300,()=>{
  console.log('Server berjalan pada port 3300')
})





