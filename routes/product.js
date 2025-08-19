const express = require("express");
const { Product, productValidation } = require("./../models/product");
const multer = require("multer");
const path = require("path");
const productRoute = express.Router();
const { Contract, contractValidation } = require("./../models/contract");

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nom = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, nom);
  },
});

const upload = multer({ storage: store });

productRoute.get("/", async (req, res) => {
  let { take = 10, page = 1 } = req.query;
  let skip = (page - 1) * take;
  try {
    let data = await Product.find().skip(skip).limit(take);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

productRoute.post("/", upload.single("pics"), async (req, res) => {
  let { value, error } = productValidation.validate(req.body);
  try {
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    let newData = new Product(value);
    await newData.save();
    res.json(newData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

productRoute.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let changes = req.body;
    let changed = await Product.findByIdAndUpdate(id, changes, { new: true });
    res.json(changed);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

productRoute.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleted = await Product.findByIdAndDelete(id);
    res.json(deleted);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let aData = await Product.findById(id);
    res.json(aData);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

productRoute.get("/", async (req, res) => {
  let { starttime, endtime } = req.body;
  try {
    let start = new Date(starttime);
    let end = new Date(endtime);
    let periodcontacts = await Contract.find({
      contract_date: { $gte: start, $lte: end },
    });
    res.json(periodcontacts);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports = productRoute;
