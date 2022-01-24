const { recBarsDb } = require('../db/rec_bars.db')
// const { getUserPrefDb } = require('../db/get_userpref.db')

const getRecBarsService = async (user_id) => {
    try {
        return await recBarsDb(user_id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getRecBarsService
}