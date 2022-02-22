const { changeEmailService } = require('../services/change_email.service')

const changeEmail = async (req, res, next) => {
   user_id = req.body.user_id
   new_email = req.body.new_pass

    try {
        await changeEmailService(user_id, new_email).then(result => {
            if(result == -1) {
                res.sendStatus(400)
            }
            else {
                res.sendStatus(200) 
            }
        })
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    changeEmail
}