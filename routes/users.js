var express = require('express');
var router = express.Router();

const UserService = require("../services/user_service.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 配置路径
router.get('/find_by_page', UserService.findByPage);
router.get('/delete', UserService.deleteById);
router.get('/read', UserService.readById);
router.get('/logout', UserService.logout);

router.post('/login', UserService.login);
router.post('/add_bill', UserService.addBill);
router.post('/updata', UserService.updataBill);

module.exports = router;
