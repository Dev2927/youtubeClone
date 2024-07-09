import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log('Incoming field:', file.fieldname);
  cb(null, true);
};

export const upload = multer({ 
  storage,
  fileFilter
});
