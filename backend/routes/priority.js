const express =require('express')
const router = express.Router();
const priorityApiController =require('../controllers/priorityApiController');


router.post('/',priorityApiController.index);
router.post('/create',priorityApiController.create);
router.post('/edit',priorityApiController.edit);
router.post('/update' ,priorityApiController.update);
router.post('/destroy',priorityApiController.destroy);
module.exports = router ;