const { getUserLoginService } = require ('../services/user_login.service')

const getUserLogin = async (req, res, next) => {
   email = req.body.email
   password = req.body.password
    try {
        console.log(email)
        console.log(password)
        const result = await getUserLoginService(email, password)
        // return success/failure 
        // res.send(result)
        if (result == 1) res.json({status: "login successful"})
        else res.json({status: "login failed"})
        next()
         // res.sendStatus(200)
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