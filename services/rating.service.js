const { ratingDb } = require('../db/rating.db')

const postRatingService = async (bar_id, stars, user_id) => {
    try {
        return await ratingDb(bar_id, stars, user_id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    postRatingService
}