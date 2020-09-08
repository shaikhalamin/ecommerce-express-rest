var mongoose = require("mongoose");
const mongoPaginate = require("mongoose-paginate");

var MenuSchema = new mongoose.Schema({
  id: Number,
  category_name: String,
  slug_url: String,
  category_banner: String,
  category_logo: String,
  parent_id: Number,
  description: String,
  child_item: { type: Array, default: [] },
  category_publication_status: Number,
  created_by: { type: Number, default: 1 },
  updated_by: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

MenuSchema.plugin(mongoPaginate);

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
