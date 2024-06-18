import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./src/_uploadedFiles");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

export default multer({ storage });

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
