import sharp from 'sharp';
import multer from 'multer';

// Upload Image in memory storage
const multerStorage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
  });
  

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only images'));
  }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

const uploadImage = upload.single('profilImages');

export const uploadProfilImage = (req, res, next) => {
    uploadImage(req, res, (error) => {
      if (error) {
        res.status(400).json(error);
      } else {
        next();
      }
    });
  };
  
// Resizing the Image
export const resizeImage = async (req, res, next) => {
    if (!req.file) return next();
    // const filename = req.file.originalname.replace(/\..+$/, '');
    const newFileName = req.body.name;
  
    try {
      await sharp(req.file.buffer)
        .resize(400, 400)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/profil/${newFileName}`);
  
      req.body.profilImage = newFileName;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
  