const { getUserLoginService } = require ('../services/user_login.service')

const getUserLogin = async (req, res, next) => {
   email = req.body.email
   password = req.body.password
    try {
        const user_id = await getUserLoginService(email, password)
        console.log(user_id)
        if (user_id == 0) res.json({status: "login failed"})
        else res.json({status: "login successful", user_id: user_id})
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getUserLogin
}