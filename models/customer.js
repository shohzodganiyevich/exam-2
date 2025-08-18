const mongoose = require("mongoose");
const joi = require("joi");

const CustomerSchema = new mongoose.Schema({
  customer_name: String,
  phone_number: String,
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
});

const Customer = mongoose.model("customer", CustomerSchema);

const customerValidation = joi.object({
  customer_name: joi.string().required(),
  phone_number: joi.string().required(),
  product_id: joi.string().required(),
});

module.exports = { Customer, customerValidation };
