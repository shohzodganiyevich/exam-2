const express = require("express");
const { Customer, customerValidation } = require("./../models/customer");

const customerRoute = express.Router();

customerRoute.get("/", async (req, res) => {
  let { take = 10, page = 1 } = req.query;
  let skip = (page - 1) * take;
  try {
    let data = await Customer.find().skip(skip).limit(take);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

customerRoute.post("/", async (req, res) => {
  let { value, error } = customerValidation.validate(req.body);
  try {
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    let newData = new Customer(value);
    await newData.save();
    res.json(newData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

customerRoute.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let changes = req.body;
    let changed = await Customer.findByIdAndUpdate(id, changes, { new: true });
    res.json(changed);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

customerRoute.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleted = await Customer.findByIdAndDelete(id);
    res.json(deleted);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
module.exports = customerRoute;
