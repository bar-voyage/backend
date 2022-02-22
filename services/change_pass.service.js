const { changePassDB } = require('../db/change_pass.db')

const changePassService = async (user_id, new_pass) => {
    try {        
        return await changePassDB(user_id, new_pass)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    changePassService
}