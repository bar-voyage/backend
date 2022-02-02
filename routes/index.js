const express = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const { postUserPref } = require('../controllers/user_pref.controller')
const { getAllBars }      = require('../controllers/all_bars.controller')
const { getUserLogin } = require('../controllers/user_login.controller')
const { postRegisterUser } = require('../controllers/register_user.controller')
const { postRating } = require('../controllers/rating.controller')
const { getRecBars } = require('../controllers/rec_bars.controller')
const { uploadPhoto } = require('../controllers/upload_photo.controller')
const { getPhotos } = require('../controllers/get_photos.controller')

const router = express.Router()

router.post('/user-pref', postUserPref)
router.get('/bars', getAllBars)
router.post('/login', getUserLogin)
router.post('/register', postRegisterUser)
router.post('/rating', postRating)
router.post('/rec_bars', getRecBars)
router.post('/upload_photo', upload.single('photo'),uploadPhoto)
router.post('/get_photos', getPhotos)

module.exports = router
