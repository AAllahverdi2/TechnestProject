const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.fieldname + '.png')
    }
})

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PNG and JPEG image files are allowed!'), false);
    }
};
const memoryStorage = multer.memoryStorage();
const uploadMemory = multer({ storage: memoryStorage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: fileFilter });
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: fileFilter })


module.exports = { upload, uploadMemory } 