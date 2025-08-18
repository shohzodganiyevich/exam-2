const mongoose = require("mongoose");
const joi = require("joi");

const contractSchema = new mongoose.Schema({
  contract_number: String,
  contract_date: Date,
  contract_price: Number,
  contract_exp: Date,
  costumer_id: {
    type: mongoose.Types.ObjectId,
    ref: "customer",
  },
});

const Contract = mongoose.model("contract", contractSchema);

const contractValidation = joi.object({
  contract_number: joi.string().required(),
  contract_date: joi.date().iso().required(),
  contract_price: joi.number().min(0).required(),
  contract_exp: joi.date().iso().required(),
  costumer_id: joi.string().required(),
});

module.exports = { Contract, contractValidation };
