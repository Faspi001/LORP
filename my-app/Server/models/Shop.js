const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ShopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "users" },

  products: [{type:mongoose.Types.ObjectId, ref:"Product"}],

  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});
module.exports = Shop = mongoose.model("shops", ShopSchema);
