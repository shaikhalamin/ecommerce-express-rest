var mongoose = require("mongoose");
const mongoPaginate = require("mongoose-paginate");
var ProductSchema = new mongoose.Schema(
  {
    id: Number,
    category_id: Number,
    product_name: String,
    product_model: String,
    product_desc: String,
    product_image: String,
    tag: String,
    product_publication_status: String,
    is_feature_product: Number,
    stock: Number,
    weight: Number,
    product_id: Number,
    outlet_id: Number,
    stock_qty: Number,
    price: Number,
    discount: String,
    product_type: String,
    product_sub_type: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

ProductSchema.plugin(mongoPaginate);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
