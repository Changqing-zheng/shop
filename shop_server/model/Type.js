const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const typeSchema = new Schema({
    id: Schema.Types.ObjectId,
    typeId: Number,
    typeName: String
});

Mongoose.model("Type", typeSchema);