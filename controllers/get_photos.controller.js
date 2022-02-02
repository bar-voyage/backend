const { getPhotosService } = require('../services/get_photos.service')


const getPhotos = async (req, res, next) => {
    try {
        await getPhotosService(req.body.bar_id).then(urls => {
            if(urls[0] != "No images found") {
                res.send(urls)
            }
            else {
                res.sendStatus(400)
            }
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
    getPhotos
}
