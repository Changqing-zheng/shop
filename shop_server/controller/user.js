const Router = require('koa-router');
let router = new Router();
const Mongoose = require('mongoose');

router.post('/registUser', async ctx => {
    //获取model
    const User = Mongoose.model("User");
    //接收post请求封装成User对象
    let newUser = new User(ctx.request.body);
    //使用save去保存信息
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: "请求成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
});

router.post("/loginUser", async ctx => {
    //接收前端发送过来的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let passWord = loginUser.passWord;
    //引入model
    const User = Mongoose.model("User");
    //先比对用户名如果用户面正确再比对密码
    await User.findOne({userName: userName}).exec().then(async (result) => {
        if(result){
            let newUser = new User();
            await newUser.comparePassword(passWord, result.passWord).then(isMatch => {
                if(isMatch){
                    ctx.body = {
                        code: 200,
                        message: "登录成功",
                        userName: result
                    }
                }else{
                    ctx.body = {
                        code: 201,
                        message: "密码错误"
                    }
                }
            })
        }else{
            ctx.body = {
                code: 201,
                message: "用户名不存在"
            }
        }
    }).catch(err => {

    })
})


module.exports = router;