const { getCurrBarDb } = require('../db/get_curr_bar.db')

const getCurrBarService = async (user_id) => {
    try {        
        const bar_id_value = await getCurrBarDb(user_id)
        const json = "{\"curr_bar\" : " + bar_id_value + "}";
        return json
        
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getCurrBarService
}