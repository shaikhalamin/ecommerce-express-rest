const express = require("express");
const router = express.Router();

//const marsWeather = require("./mars-weather");
const products = require("./routes/products");
const myProducts = require("./routes/rdb.products");


router.get("/", (req, res) => {
  res.json({ message: "grocery-ecomeerce-api" });
});

router.use("/products", products);
router.use("/my-products", myProducts);
//router.use("/mars-weather", marsWeather);

module.exports = router;
