const { setContentViewDb } = require('../db/set_content_view.db')

const setContentViewService = async (user_id, content_viewable) => {
    try {        
        return await setContentViewDb(user_id, content_viewable)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    setContentViewService
}