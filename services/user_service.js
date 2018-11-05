 
const UserDao = require("../dao/user_dao.js");

const UserService = {
    // 用户登录
    login(req,res,next){
        const {name,password} = req.body;
        console.log("login_____________",req.body)
        UserDao.find( {name} )
                .then((data) => {
                    console.log("LoginData__________",data)
                    if(data.length === 1) {
                        //判断，密码
                        if(password === data[0].password) {
                            // 用户登录成功，在 session 中保存登录成功的用户信息
                            console.log("_______________________________")
                            req.session.username = name;
                            console.log(" req.session.loginUser____", req.session.username)
                            res.json({
                                res_code:1,
                                res_error:"",
                                res_body:{
                                    status:1,
                                    message:"success",
                                    data:{
                                        username: data[0].name
                                    }
                                }
                            })
                        } else{
                            res.json({
                                res_code:1,
                                res_error:"",
                                res_body:{
                                    status:0,
                                    message:"密码错误",
                                    data:{}
                                }
                            });
                        }
                    } else { //不存在用户
                        res.json({
                            res_code: 1,
                            res_error:"",
                            res_body: {
                                status: 0,
                                message: "用户名不存在",
                                data: {}
                            }
                        })
                    }
                })
                .catch((err) => {
                    // 数据操作失败
                    res.json({
                        res_code:0,
                        res_error:err,
                        res_body:{}
                    });
                })
    },
    // 账单管理
    addBill(req, res, next) {
        const {billNumber,foodName,foodAmount,payment,billAmount} = req.body;
        console.log("addBill_________",req.body);
        UserDao.save({billNumber,foodName,foodAmount,payment,billAmount})
                .then((data) => {
                    // 注册成功即登录成功，省一次登录操作

                    res.json({
                        res_code:1,
                        res_error:"",
                        res_body:{
                            status:1,
                            data: data
                        }
                    })
                    console.log(data);
                })
                .catch((err) => {
                    res.json({
                        res_code:1,
                        res_error:err,
                        res_body:{status:0}
                    })

                })
    },
    // [按页] 查询数据
    findByPage(req, res, next){
        const {page} = req.query;
        console.log("findByPage________",page);
        UserDao.findByPage(page).then((data) => {
            res.json({
                res_code: 1,
                res_error: "",
                res_body: {
                    status: 1,
                    list: data
                }
            });
        }).catch((err) => {
            res.json({
                res_code: 0,
                res_error: err,
                res_body: {}
            });
        })
    },
    // 删除元素
    deleteById(req, res, next){
        const {billNumber} = req.query;
        UserDao.deleteById(billNumber).then((data) => {
            res.json({
                res_code: 1,
                res_error: "",
                res_body: {
                    status: 1,
                }
            });
        }).catch((err) => {
            res.json({
                res_code: 1,
                res_error: err,
                res_body: {
                    status: 0,
                }
            });
        })
    },
    // 查看元素
    readById(req, res, next){
        const {billNumber} = req.query;
        UserDao.readById(billNumber).then((data) => {
            res.json({
                res_code: 1,
                res_error: "",
                res_body: {
                    status: 1,
                    data:data
                }
            });
        }).catch((err) => {
            res.json({
                res_code: 1,
                res_error: err,
                res_body: {
                    status: 0,
                }
            });
        })
    },
    // 更新数据
    updataBill(req, res, next){
        const {billNumber,foodName,foodAmount,payment,billAmount} = req.body;
        
        UserDao.updataBill({billNumber,foodName,foodAmount,payment,billAmount})
                .then((data) => {
                    console.log("updata____________",data)
                    // 注册成功即登录成功，省一次登录操作
                    res.json({
                        res_code:1,
                        res_error:"",
                        res_body:{
                            status:1,
                        }
                    })
                })
                .catch((err) => {
                    res.json({
                        res_code:1,
                        res_error:err,
                        res_body:{status:0}
                    })

                })
    },
    // 注销账号，消除session
    logout(req,res,next){
        req.session.username = null;
        console.log("退出登录_____req.session.username_____",req.session.username);
        res.json({
            res_code: 1,
			res_error: "",
			res_body: {
				status: 1
			}
        })
    }
}

module.exports = UserService;