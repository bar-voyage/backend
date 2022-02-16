const { postRatingService } = require('../services/rating.service')

const postRating = async (req, res, next) => {
    try {
        console.log(req.body.bar_id)
        console.log(req.body.num_stars)
        await postRatingService(req.body.bar_id, req.body.num_stars).then(result => {
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
    postRating
}