const { getPhotosDb } = require('../db/get_photos.db')

const getPhotosService = async (bar_id) => {
    try {
        return await getPhotosDb(bar_id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getPhotosService
}