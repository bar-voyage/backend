const { setCurrBarService } = require('../services/set_curr_bar.service')

const setCurrBar = async (req, res, next) => {
    try {
        /* body arguments:
         *      user_id : user id
         *      bar_id  : bar id
         */
        await setCurrBarService(req.body.user_id, req.body.bar_id)
        res.sendStatus(200)
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    setCurrBar
}
