const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta de destino para los archivos subidos
const uploadDir = path.join(__dirname, '../../../web-rs_is/public/Imagenes/publicaciones');

// Crear la carpeta de destino si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
