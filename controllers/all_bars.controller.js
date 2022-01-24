const { getAllBarsService } = require('../services/all_bars.service')

const getAllBars = async (req, res, next) => {
   
    try {
        const result = await getAllBarsService()
        res.send(result)
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getAllBars
}