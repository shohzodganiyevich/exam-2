const express = require("express");
const { Category, categoryValidation } = require('./../models/category');

const categoryRoute = express.Router();

categoryRoute.get("/", async (req, res) => {
  let { take = 10, page = 1 } = req.query;
  let skip = (page - 1) * take;
  try {
    let data = await Category.find().skip(skip).limit(take);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

categoryRoute.post("/", async (req, res) => {
  let { value, error } = categoryValidation.validate(req.body);
  try {
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    let newData = new Category(value);
    await newData.save();
    res.json(newData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

categoryRoute.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let changes = req.body;
    let changed = await Category.findByIdAndUpdate(id, changes, { new: true });
    res.json(changed);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

categoryRoute.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleted = await Category.findByIdAndDelete(id);
    res.json(deleted);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
module.exports = categoryRoute;
