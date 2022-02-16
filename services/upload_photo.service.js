const { uploadPhotoDb } = require('../db/upload_photo.db')

const uploadPhotoService = async (bar_id, user_id, photo, phototype, filename) => {
    try {
        result = await uploadPhotoDb(bar_id, user_id, photo, phototype, filename)
        if(result == 1) {
            return "UploadPhoto: Success"
        }
        else return "UploadPhoto: Failure"
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    uploadPhotoService
}