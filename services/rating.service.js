const { ratingDb } = require('../db/rating.db')

const postRatingService = async (bar_id, stars) => {
    try {
        return await ratingDb(bar_id, stars)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    postRatingService
}