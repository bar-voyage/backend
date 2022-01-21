const { allBarsDb } = require('../db/all_bars.db')

const getAllBarsService = async () => {
    try {        
        return await allBarsDb()
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getAllBarsService
}