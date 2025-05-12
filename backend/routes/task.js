const express =require('express')
const router = express.Router();
const taskApiController =require('../controllers/tasksApiController');


router.post('/index',taskApiController.index);
router.post('/create',taskApiController.create);
router.post('/edit',taskApiController.edit);
router.post('/update' ,taskApiController.update);
router.post('/destroy',taskApiController.destroy);
module.exports = router ;