// 连接处理mongodb 的依赖
const mongoose = require("mongoose");

//连接数据库
// current URL string parser is deprecated,
mongoose.connect('mongodb://localhost/first',{useNewUrlParser:true});

//schema [概要，计划，图标]， 数据结构：用户
const userSchema = new mongoose.Schema( {
    name: String,
    password:String,
    // .............
} );

const billSchema = new mongoose.Schema( {
    billNumber: String,
    foodName:String,
    foodAmount:Number,
    billAmount:Number,
    payment:String
    // .............
} )


//model -集合：用户 ; 对应user 集合,自动寻找_______‘users’
const User = mongoose.model('user',userSchema);
const Bill = mongoose.model('bill',billSchema);

module.exports = {User,Bill};