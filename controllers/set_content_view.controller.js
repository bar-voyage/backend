const { setContentViewService } = require('../services/set_content_view.service')

const setContentView = async (req, res, next) => {
    try {
        /* body arguments:
         *      user_id : user id
         *      content_view : what to set the content_viewable field to
         */
        await setContentViewService(req.body.user_id, req.body.content_view)
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
    setContentView
}
