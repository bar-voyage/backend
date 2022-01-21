const { postUserPrefService } = require('../services/user_pref.service')

const postUserPref = async (req, res, next) => {
    prefs = req.body.pref;
    user_id = req.body.user_id;
    
    try {
        await postUserPrefService(prefs, user_id).then(result => {
            res.sendStatus(200)
                .send(result)
        });
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
    postUserPref
}