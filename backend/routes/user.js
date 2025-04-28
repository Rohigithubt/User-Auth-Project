const express =require('express')
const router = express.Router();
const User =require('../models/User');
const userApiController =require('../controllers/userApiControllers');


router.post('/register',userApiController.register);
router.post('/login',userApiController.login);
router.post('/edit-profile',userApiController.editprofile);
router.post('/update-profile' ,userApiController.updateprofile);
router.post('/destroy',userApiController.destroy);
router.post('/forget-password',userApiController.forgetPassword);
router.post('/reset-password',userApiController.resetPassword);
router.post('/logout',userApiController.logout);
module.exports = router ;