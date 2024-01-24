import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/resume/");
    },

    filename: (req, file, cb) => {
        let name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

export const uploadFile = multer({storage : storageConfig});