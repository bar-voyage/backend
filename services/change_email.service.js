const { changeEmailDB } = require('../db/change_email.db')

const changeEmailService = async (user_id, new_email) => {
    try {        
        return await changeEmailDB(user_id, new_email)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    changeEmailService
}