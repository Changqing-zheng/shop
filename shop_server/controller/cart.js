const Router = require("koa-router");
let router = new Router();
const Mongoose = require("mongoose");

router.post("/addCart", async (ctx) => {
    const Cart = Mongoose.model("Cart");
    let cart = new Cart(ctx.request.body);
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: "添加成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
});

router.get("/getCart", async (ctx) => {
    const CartList = Mongoose.model("Cart");
    await CartList.find({
        userId: ctx.query.userId
    }).populate('productId').exec().then(res => {
        // console.log(111)
        ctx.body = res;
    }).catch(err => {
        ctx.body = err;
    })
});

module.exports = router;