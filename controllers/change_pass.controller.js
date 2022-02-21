const { changePassService } = require('../services/change_pass.service')

const changePass = async (req, res, next) => {
   user_id = req.body.user_id
   new_pass = req.body.new_pass

    try {
        await changePassService(user_id, new_pass).then(result =>
            res.sendStatus(200)
        )
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    changePass
}