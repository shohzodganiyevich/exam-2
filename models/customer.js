const mongoose = require("mongoose");
const joi = require("joi");

const CustomerSchema = new mongoose.Schema({
  customer_name: String,
  phone_number: String,
  passport_seriya: String,
  passport_number: Number,
  address: String,
});

const Customer = mongoose.model("customer", CustomerSchema);

const customerValidation = joi.object({
  customer_name: joi.string().required(),
  phone_number: joi.string().required(),
  passport_seriya: joi.string().required(),
  passport_number: joi.number().required(),
  address: joi.string().required(),
});

module.exports = { Customer, customerValidation };
