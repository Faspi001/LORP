const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true},
    description: {
        type: String,
        required: true},
    image: {
        type: String,
        required: true},
    
    price: Number,
    bio: {type: Boolean,
        require: true},
    shops:  {type:mongoose.Types.ObjectId, ref:"shops"},
})

module.exports = mongoose.model("Product", ProductSchema)