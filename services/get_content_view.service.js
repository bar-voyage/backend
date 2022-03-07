const { getContentViewDb } = require('../db/get_content_view.db')

const getContentViewService = async (user_id) => {
    try {        
        const value = await getContentViewDb(user_id)
        const json = "{\"content_viewable\" : " + value + "}";
        return json
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getContentViewService
}