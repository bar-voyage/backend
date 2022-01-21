const { userPrefDb } = require('../db/user_pref.db')

const postUserPrefService = async (pref, user_id) => {
    try {
        return await userPrefDb(pref, user_id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    postUserPrefService
}