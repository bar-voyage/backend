const { getUserLoginService } = require ('../services/user_login.service')

const getUserLogin = async (req, res, next) => {
   email = req.body.email
   password = req.body.password
    try {
        const user_data = await getUserLoginService(email, password)
        console.log(user_data)
        if (user_data == 0) res.json({status: "login failed"})
        else res.json({status: "login successful", user_id: user_data.user_id, fname: user_data.fname, lname: user_data.lname})
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