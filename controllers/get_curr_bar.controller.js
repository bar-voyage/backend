const { getCurrBarService } = require('../services/get_curr_bar.service')

const getCurrBar = async (req, res, next) => {
    try {
        /* body arguments:
         *      user_id : user id
         */
        const bar_id = await getCurrBarService(req.body.user_id)
        res.send(bar_id)
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getCurrBar
}
