const express = require("express");
const mongoose = require("mongoose");
const app = express();
const brandRoute = require("./routes/brand");
mongoose
  .connect(
    "mongodb+srv://shohzodganiyevich:XWPGIYWHLgizmeS2@cluster0.d6qnfnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use("/brand", brandRoute);

app.listen(3000, () => console.log("server runs on 3000 port"));
