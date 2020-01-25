const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");
const Shop = require("../../models/Shop");

// List of all Products
router.get("/list", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.json(products);
});

//add new Product
router.post("/add", async (req, res) => {
  console.log(req.body);
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: "https://via.placeholder.com/150x150.png?text=Item",
    price: req.body.price,
    bio: req.body.bio,
    shops: req.body.shopID
  });
  console.log(product.shops)
  const shopID = await Shop.findById(product.shops);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await product.save({ session: sess });
  shopID.products.push(product);
  await shopID.save({ session: sess });
  await sess.commitTransaction();
  res.json(product);
});

router.post("/add/:sid", async (req, res) => {
  const shop = await Shop.findById(req.params.sid);
  const sess = await mongoose.startSession();
  sess.startTransaction();
});

router.get("/list/:id", async(req,res) =>{
    const userId = req.params.id
    const product = await Product.find({shops: userId})
    // FIND returns array, map to get every Shop out
    res.json({product: product.map((product => product.toObject({getters:true})))})
})

//GET ITEM WITH ID
router.get("/item/:id", async(req,res) =>{
    const itemID = req.params.id;
    const item = await Product.findById(itemID)
    res.json({item: item.toObject({getters:true})});

})

//UPDATE ITEM WITH ID
router.post("/item/update",async(req,res)=>{
  console.log(req.body);
  const {price,bio} = req.body;
  const itemID = req.body.id;
  const item = await Product.findById(itemID);
  item.price = price;
  item.bio = bio;
  await item.save().then(item=> res.json({item: item.toObject({getters:true})}))
})

//DELETE ITEM WITH ID FROM SHOP
router.delete("/item/delete/:id",async(req,res)=>{
  productID = req.params.id
  console.log("HIER PRODUCT ID",productID)
  const product = await Product.findById(productID).populate("shops");
  console.log("mein prodcut", product.shops)
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await product.remove({session:sess});
  product.shops.products.pull(product)
  await product.shops.save({session:sess})
  await sess.commitTransaction();
  res.json("item removed")
})

module.exports = router;
