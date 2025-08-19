const mongoose = require("mongoose");
const joi = require("joi");

const ProductSchema = new mongoose.Schema({
  product_name: String,
  brand_id: {
    type: mongoose.Types.ObjectId,
    ref: "brand",
  },
  product_price: Number,
  remainder: Number,
  sell_day:{
    type:mongoose.Types.ObjectId,
    ref:"contract"
  }
});

const Product = mongoose.model("product", ProductSchema);

const productValidation = joi.object({
  product_name: joi.string().required(),
  brand_id: joi.string().required(),
  product_price: joi.number().min(0).required(),
  remainder: joi.number().min(0).required(),
});

module.exports = { Product, productValidation };
