const { Schema, model, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  image_url: {
    type: String,
    default:
      "https://fakeimg.pl/420x320/ff0000%2C128/333333%2C255/?text=Defult%20Image&font=lobster",
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const ProductModel = model("product", ProductSchema);

module.exports = ProductModel;
