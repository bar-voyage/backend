const { getAdjDb } = require('../db/get_adj.db')

const getAdjService = async (bar_id) => {
    try {        
        return await getAdjDb(bar_id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getAdjService
}