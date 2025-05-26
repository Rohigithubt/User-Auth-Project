const express =require('express')
const router = express.Router();
const upload = require('../config/multerfile')
const userApiController =require('../controllers/userApiControllers');


router.post('/',userApiController.index);
router.post('/index-user',userApiController.indexUser);
router.post('/register',userApiController.register);
router.post('/register-user',userApiController.registerUser);
router.post('/login',userApiController.login);
router.post('/edit-profile',userApiController.editprofile);
router.post('/update-profile' ,upload.single('image'),userApiController.updateprofile);
router.post('/destroy',userApiController.destroy);
router.post('/forget-password',userApiController.forgetPassword);
router.post('/reset-password',userApiController.resetPassword);
router.post('/logout',userApiController.logout);
module.exports = router ;