const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const log = require('debug')('app');

const app = express();

// Configura multer para gestionar la carga de archivos
const storage = multer.memoryStorage(); // Almacena el archivo en la memoria
const upload = multer({ storage });

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  log('/api/fileanalyse');
  if (req.file) {
    res.json({
      name: req.file.originalname,
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
