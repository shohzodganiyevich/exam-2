const mongoose = require("mongoose");
const joi = require("joi");

const BrandSchema = new mongoose.Schema({
  brand_name: String,
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
});

const Brand = mongoose.model("brand", BrandSchema);

const brandValidation = joi.object({
  brand_name: joi.string().required(),
  category_id: joi.string().required(),
});

module.exports = { Brand, brandValidation };


