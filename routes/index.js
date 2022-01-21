const express = require('express')

const { postUserPref } = require('../controllers/user_pref.controller')

const router = express.Router()

router.post('/user-pref', postUserPref)

// router.post('/blogpost', blogpost.postBlogpost)

module.exports = router
