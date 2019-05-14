const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    userId: Schema.Types.ObjectId,
    userName: {unique: true, type: String},
    passWord: String,
    createDate: {type: Date, default: Date.now()}
});

UserSchema.pre("save", function(next){
    //生成随机salt，10为迭代次数一般为10
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(this.passWord, salt, (err, hash) => {
            if(err) return next(err);
            this.passWord = hash;
            next();
        })
    })
});

//对比密码函数
UserSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if(!err){
                    resolve(isMatch)
                }else{
                    reject(err)
                }
            })
        })
    }
}

//发布模型
Mongoose.model('User', UserSchema);