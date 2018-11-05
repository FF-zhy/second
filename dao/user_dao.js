// 引入模块
const {User,Bill} = require("./model.js")

const UserDao = {
    // 查找用户数据
    find(condition) {
        console.log("condition___________",condition);
        return User.find(condition);
    },
    save(data){
        console.log("dao___________",data);
        //创建文档
        const bill = new Bill(data) ;

        return bill.save();
    },
    // 按页查找数据
    findByPage(page){
        return Bill.find({});
    },
    //删除
    deleteById(billNumber){
        return Bill.deleteOne({billNumber});
    },
    // 读取，查看数据
    readById(billNumber){
        return Bill.findOne({billNumber});
    },
    updataBill(req){
        const {billNumber,foodName,foodAmount,payment,billAmount} = req ;

        return Bill.update({billNumber},{foodName,foodAmount,payment,billAmount})
    }
}


module.exports = UserDao;