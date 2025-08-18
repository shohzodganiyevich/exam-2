const express = require("express");
const {Contract, contractValidation  } = require('./../models/contract');

const contractRoute = express.Router();

contractRoute.get("/", async (req, res) => {
  let { take = 10, page = 1 } = req.query;
  let skip = (page - 1) * take;
  try {
    let data = await Contract.find().skip(skip).limit(take);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

contractRoute.post("/", async (req, res) => {
  let { value, error } = contractValidation.validate(req.body);
  try {
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    let newData = new Contract(value);
    await newData.save();
    res.json(newData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

contractRoute.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let changes = req.body;
    let changed = await Contract.findByIdAndUpdate(id, changes, { new: true });
    res.json(changed);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

contractRoute.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleted = await Contract.findByIdAndDelete(id);
    res.json(deleted);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
module.exports = contractRoute;
