const { getPastBarsDb } = require('../db/get_past_bars.db')

const getPastBarsService = async (user_id) => {
    try {        
        const past_bars = await getPastBarsDb(user_id)
        if(past_bars.length == 0) {
            return -1
        }
        else {
            return past_bars
        }
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getPastBarsService
}