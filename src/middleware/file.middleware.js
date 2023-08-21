const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const uploadAvatar = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, UPLOAD_PATH)
        },
        filename(req, file, callback) {
            callback(null, Date.now() + '_' + file.originalname)
        }
    })
})

const handleAvatar = uploadAvatar.single('avatar')

module.exports = {
    handleAvatar
}