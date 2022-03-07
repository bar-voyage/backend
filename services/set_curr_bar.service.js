const { setCurrBarDb } = require('../db/set_curr_bar.db')

const setCurrBarService = async (user_id, bar_id) => {
    try {        
        return await setCurrBarDb(user_id, bar_id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    setCurrBarService
}