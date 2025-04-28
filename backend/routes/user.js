const express =require('express')
const router = express.Router();
const User =require('../models/User');
const userApiController =require('../controllers/userApiControllers');


router.post('/register',userApiController.register);
router.post('/login',userApiController.login);
router.post('/editprofile',userApiController.editprofile);
router.post('/updateprofile' ,userApiController.updateprofile);
router.post('/destroy',userApiController.destroy);
router.post('/forgetPassword',userApiController.forgetPassword);
router.post('/resetPassword',userApiController.resetPassword);
module.exports = router ;