const { getRecBarsService } = require('../services/rec_bars.service')

const getRecBars = async (req, res, next) => {
    try {
        const result = await getRecBarsService(req.body.user_id)
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
    getRecBars
}