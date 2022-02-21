const { getContentViewService } = require('../services/get_content_view.service')

const getContentView = async (req, res, next) => {
    try {
        /* body arguments:
         *      user_id : user id
         */
        const result = await getContentViewService(req.body.user_id)
        console.log(result)
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
    getContentView
}
