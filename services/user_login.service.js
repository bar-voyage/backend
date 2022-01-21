const { userLoginDb } = require('../db/user_login.db')

const getUserLoginService = async (email, password) => {
    try {        
        return await userLoginDb(email, password)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getUserLoginService
}