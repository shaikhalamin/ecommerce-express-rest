const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
const Menu = require("../models/Menu.js");



router.get("/", async (req, res, next) => {
  try {
    const pageValue = req.query.page ? parseInt(req.query.page) : 1;

    const limitValue = req.query.limit ? parseInt(req.query.limit) : 30;

    /*
    const products = await Product.paginate(
      { product_type: "essential" },
      { page: pageValue, limit: limitValue }
    );*/

    const products = await Product.paginate(
      {},
      { page: pageValue, limit: limitValue }
    );

    res.status(200).json({
      data: products.docs
    });
  } catch (err) {
    console.log(err);
  }
});


router.get("/menus", async (req, res, next) => {
  try {
    const pageValue = req.query.page ? parseInt(req.query.page) : 1;

    const limitValue = req.query.limit ? parseInt(req.query.limit) : 30;

    const menus = await Menu.paginate(
      {},
      { page: pageValue, limit: limitValue }
    );

    res.status(200).json({
      data: menus.docs
    });
  } catch (err) {
    console.log(err);
  }
});

/*
router.get("/download-images", async (req, res, next) => {
  try {
    const pageValue = req.query.page ? parseInt(req.query.page) : 1;

    const limitValue = req.query.limit ? parseInt(req.query.limit) : 1;

    const product = await Product.paginate(
      {},
      { page: pageValue, limit: limitValue }
    );

    if (product.docs) {
      const data = product.docs;

      for (let d = 0; d < data.length; d++) {
        https.get(
          "https://www.meenaclick.com/back_end/assets/product_images/5c4448f12e7b9.png",
          res => res.pipe(fs.createWriteStream("5c4448f12e7b9.png"))
        );
      }
    }
    res.send(200, "ok");
  } catch (err) {
    console.log(err);
  }
});

*/

router.get("/types/:product_type", async (req, res, next) => {
  try {
    const pageValue = req.query.page ? parseInt(req.query.page) : 1;

    const limitValue = req.query.limit ? parseInt(req.query.limit) : 30;
    const product_type = req.params.product_type;
    console.log(req.params);

    //const products = await Product.deleteMany({ product_type: product_type });

    const products = await Product.find({ product_type: product_type });

    /*
    const products = await Product.paginate(
      { product_type: product_type },
      { page: pageValue, limit: limitValue }
    );*/

    res.status(200).json({
      data: products
    });
  } catch (err) {
    console.log(err);
  }
});


router.post("/", async (req, res, next) => {
  const {
    id,
    category_id,
    product_name,
    product_model,
    product_desc,
    product_image,
    tag,
    product_publication_status,
    is_feature_product,
    stock,
    weight,
    product_id,
    outlet_id,
    stock_qty,
    price,
    discount
  } = req.body;

  const product = new Product(req.body);

  try {
    const newProduct = await product.save();

    res.status(201).json({
      sucess: true,
      data: product
    });
  } catch (err) {
    console.log(err);
  }
});

/*
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  console.log(req.params);
  res.status(200).json({
    message: "fetching data by id",
    Id: id
  });
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product by ID"
  });
});
*/

router.delete("/products/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Product deleted"
  });
});

module.exports = router;
