const multer = require(`multer`);
const path = require(`path`);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback( null, `public/partners`);
    },
    filename: function (req, file, callback) {
        let fileType = ``;
        if (file.mimetype === 'image/gif') {
            fileType = 'gif';
        }
        if (file.mimetype === 'image/png') {
            fileType = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            fileType = 'jpg';
        }
        callback( null, Date.now() + `.` + fileType);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/gif' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/GIF' || file.mimetype === 'image/PNG' || file.mimetype === 'image/JPEG'
    ) {
        callback (null, true)
    } else {
        callback (null, false)
    }
}

const uploadPartnerImage = multer({ storage: storage});

module.exports.uploadPartnerImage = uploadPartnerImage;