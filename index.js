const express = require('express');
const multer = require('multer');
const iconv = require('iconv-lite');
const cors = require('cors');
require('dotenv').config();
const log = require('debug')('app');

const app = express();
app.use(express.urlencoded({ extended: true, encoding: 'utf8' }));

// Configura multer para gestionar la carga de archivos
const storage = multer.memoryStorage(); // Almacena el archivo en la memoria
const upload = multer({ storage, encoding: 'utf8' });

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.sendFile(`${process.cwd()}/views/index.html`);
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  log('/api/fileanalyse');
  if (req.file) {
    log('req.file', req.file);
    const originalname = iconv.decode(req.file.originalname, 'ISO-8859-1');
    res.json({
      name: originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } else {
    res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  log(`Your app is listening on port ${port}`);
});
