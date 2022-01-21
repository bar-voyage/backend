const express = require('express')

const { postUserPref } = require('../controllers/user_pref.controller')
const { getAllBars }      = require('../controllers/all_bars.controller')

const router = express.Router()

router.post('/user-pref', postUserPref)
router.get('/bars', getAllBars)

// router.post('/blogpost', blogpost.postBlogpost)

module.exports = router
