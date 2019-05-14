const Mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/shop';

//引入Schema
const glob = require('glob');
const path = require('path');
exports.initSchema = () => {
  glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require)
};


exports.connect = () => {
    //连接数据库
    Mongoose.connect(db, {
        useNewUrlParser: true
    });
    //监听数据库连接
    Mongoose.connection.on("disconnected", () => {
        Mongoose.connect(db);
    });
    //数据库出现错误
    Mongoose.connection.on('error', err => {
        console.log(err);
        Mongoose.connect(db);
    });
    //连接成功
    Mongoose.connection.once('open', () => {
        console.log("mongodb connected success");
    })
};