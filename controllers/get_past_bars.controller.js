const { getPastBarsService } = require('../services/get_past_bars.service')

const getPastBars = async (req, res, next) => {
    try {
        await getPastBarsService(req.body.user_id).then(past_bars => {
            if(past_bars != -1) {
                res.send(past_bars)
            }
            else {
                res.sendStatus(400)
            }
        });
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getPastBars
}
