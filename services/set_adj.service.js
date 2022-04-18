const { setAdjDb } = require('../db/set_adj.db')

const setAdjService = async (bar_id, adj_list) => {
    try {        
        return await setAdjDb(bar_id, adj_list)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    setAdjService
}