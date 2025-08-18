const mongoose = require("mongoose");
const joi = require("joi");

const PaymentSchema = new mongoose.Schema({
  payment_value: Number,
  payment_date: Date,
  customer_id: {
    type: mongoose.Types.ObjectId,
    ref: "customer",
  },
  contract_id: {
    type: mongoose.Types.ObjectId,
    ref: "contract",
  },
});

const Payment = mongoose.model("payment", PaymentSchema);

const paymentValidation = joi.object({
  payment_value: joi.number().min(0).required(),
  payment_date: joi.date().iso().required(),
  customer_id: joi.string().required(),
  contract_id: joi.string().required(),
});

module.exports = { Payment, paymentValidation };
