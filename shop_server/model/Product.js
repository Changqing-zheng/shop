const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    company: String,
    city: String,
    type: Number,
    img: String
});

Mongoose.model("Product", productSchema);
