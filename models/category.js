const mongoose = require("mongoose");
const joi = require("joi");

const CategorySchema = new mongoose.Schema({
  category_name: String,
});

const Category = mongoose.model("category", CategorySchema);

const categoryValidation = joi.object({
  category_name: joi.string().required(),
});

module.exports = { Category, categoryValidation };
