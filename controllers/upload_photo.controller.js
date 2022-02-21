const { uploadPhotoService } = require('../services/upload_photo.service')
const multer = require('multer');


const uploadPhoto = async (req, res, next) => {
    try {
        console.log(req.body.phototype)
        console.log(req.body.user_id)
        console.log(req.body.bar_id)
        await uploadPhotoService(req.body.bar_id, req.body.user_id, req.body.photo, req.body.phototype, req.body.filename).then(result => {
            res.sendStatus(200)
        });
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    uploadPhoto
}
