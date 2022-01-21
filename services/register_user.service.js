const { registerUserDb } = require('../db/register_user.db')
const { userLoginDb } = require('../db/user_login.db')

const postRegisterUserService = async (email, password) => {
    try {
        return await registerUserDb(email, password)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    postRegisterUserService
}