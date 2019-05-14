const Koa = require("koa");
const Mongoose = require("mongoose");
const Router = require("koa-router");
let router = new Router();
const fs = require("fs");

router.get("/insertType", async (ctx) => {
   fs.readFile("./data/type.json", "utf8", (err, data) => {
       data = JSON.parse(data);
       console.log(data);
       let count = 0;
       const Type = Mongoose.model("Type");
       data.map((value, index) => {
           let type = new Type(value);
           type.save().then(() => {
               count++;
               console.log("成功" + count);
           }).catch(err => {
               console.log("错误" + err)
           })
       })
   })
    ctx.body = "导入数据"
});

router.get("/getType", async (ctx) => {
   const Type = Mongoose.model("Type");
   await Type.find().exec().then(res => {
       ctx.body = res;
   }).catch(err => {
       console.log(err)
   })
});

module.exports = router;