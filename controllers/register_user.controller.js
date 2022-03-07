const { postRegisterUserService } = require('../services/register_user.service')

const postRegisterUser = async (req, res, next) => {
    email = req.body.email;
    password = req.body.password;
    fname = req.body.fname;
    lname = req.body.lname;
    age = req.body.age;
    gender = req.body.gender;

    console.log(req.body)
    try {
        result = await postRegisterUserService(email, password, fname, lname, age, gender)
        if (result == 1) res.sendStatus(200)
        else res.sendStatus(500)
        // });
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
    postRegisterUser
}