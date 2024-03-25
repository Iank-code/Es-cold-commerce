const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Logger = require("./middlewares/logger/logger");

// Importing routes
const customerRoute = require("./routes/customer.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const orderRoute = require("./routes/order.route");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected succssfully"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(cors());

app.use("/api/customer", customerRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  Logger.debug("Server started");
  Logger.info(`Running on 👉🏼 ${process.env.PORT}`);
});
