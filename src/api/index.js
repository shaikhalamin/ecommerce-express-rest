const express = require("express");
const router = express.Router();

//const marsWeather = require("./mars-weather");
const products = require("./routes/products");
const myProducts = require("./routes/mysqlproducts");



router.get("/", (req, res) => {
  res.json({ message: "API - 👋🌎🌍🌏" });
});

router.use("/products", products);
router.use("/my-products", myProducts);
//router.use("/mars-weather", marsWeather);

module.exports = router;
