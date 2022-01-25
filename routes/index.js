const express = require('express')

const { postUserPref } = require('../controllers/user_pref.controller')
const { getAllBars }      = require('../controllers/all_bars.controller')
const { getUserLogin } = require('../controllers/user_login.controller')
const { postRegisterUser } = require('../controllers/register_user.controller')
const { postRating } = require('../controllers/rating.controller')
const { getRecBars } = require('../controllers/rec_bars.controller')

const router = express.Router()

router.post('/user-pref', postUserPref)
router.get('/bars', getAllBars)
router.post('/login', getUserLogin)
router.post('/register', postRegisterUser)
router.post('/rating', postRating)
router.post('/rec_bars', getRecBars)

module.exports = router
