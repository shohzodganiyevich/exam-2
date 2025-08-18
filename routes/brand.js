const express = require("express");
const { Brand, brandValidation } = require("./../models/brand");

const brandRoute = express.Router();

brandRoute.get("/", async (req, res) => {
  let { take = 10, page = 1 } = req.query;
  let skip = (page - 1) * take;
  try {
    let data = await Brand.find().skip(skip).limit(take);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports=brandRoute
