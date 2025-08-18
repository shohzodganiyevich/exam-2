const express = require("express");
const mongoose = require("mongoose");
const app = express();
const brandRoute = require("./routes/brand");
const categoryRoute = require("./routes/category");
const contractRoute = require("./routes/contract");
const customerRoute = require("./routes/customer");
const paymentRoute = require("./routes/payment");
const productRoute = require("./routes/product");
mongoose
  .connect(
    "mongodb+srv://shohzodganiyevich:XWPGIYWHLgizmeS2@cluster0.d6qnfnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use("/brand", brandRoute);
app.use("/category", categoryRoute);
app.use("/contract", contractRoute);
app.use("/customer", customerRoute);
app.use("/payment", paymentRoute);
app.use("/product", productRoute);

app.listen(3000, () => console.log("server runs on 3000 port"));
