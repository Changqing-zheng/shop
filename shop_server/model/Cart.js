const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema({
    id: ObjectId,
    productId: {
        type: ObjectId,
        ref: "Product" //指向联合查询的model
    },
    userId: ObjectId,
    createDate: {
        type: Date,
        default: Date.now()
    }
})

Mongoose.model("Cart", cartSchema)