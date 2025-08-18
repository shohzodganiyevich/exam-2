const express = require("express");
const { Payment, paymentValidation } = require("./../models/payment");

const paymentRoute = express.Router();

paymentRoute.get("/", async (req, res) => {
  let { take = 10, page = 1 } = req.query;
  let skip = (page - 1) * take;
  try {
    let data = await Payment.find().skip(skip).limit(take);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

paymentRoute.post("/", async (req, res) => {
  let { value, error } = paymentValidation.validate(req.body);
  try {
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    let newData = new Payment(value);
    await newData.save();
    res.json(newData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

paymentRoute.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let changes = req.body;
    let changed = await Payment.findByIdAndUpdate(id, changes, { new: true });
    res.json(changed);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

paymentRoute.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleted = await Payment.findByIdAndDelete(id);
    res.json(deleted);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
module.exports = paymentRoute;
