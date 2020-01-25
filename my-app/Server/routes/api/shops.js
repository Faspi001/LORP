//TODO ERROR HANDLING
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//VALIDATORS
const validateShopInput = require("../../validation/shop");

//SHOP MODEL

const Shop = require("../../models/Shop");
const User = require("../../models/User");

// @route POST api/shop/create
// @desc Create Shop

router.post("/create", async (req,res) =>{

    const {errors, isValid} = validateShopInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    const newShop = new Shop({
                name: req.body.name,
                adresse: req.body.adresse,
                creator: req.body.creator,
                products: [],
                location: {
                    lat: req.body.location.lat,
                    lng: req.body.location.lng
                }
            });
            const user = await User.findById(newShop.creator)
            if(!isValid){
                return res.status(400).json(errors);
            }
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await newShop.save({session: sess});
            user.shop.push(newShop);
            await user.save({session: sess});
            await sess.commitTransaction()
            res.json(newShop)
        }
)
    
//Get all Shops
router.get("/shops", async (req,res) =>{
    const shop = await Shop.find({})
    res.json(shop)
})

//GET shop by ID
router.get("/shops/:sid", async(req,res) =>{
    const shopId = req.params.sid
    const shop = await Shop.findById(shopId)
    res.json({shop:shop.toObject({getters:true})})
})

//GET SHOP by Creator ID
router.get("/shops/user/:uid", async(req,res) =>{
    const userId = req.params.uid
    const shops = await Shop.find({creator: userId})
    // FIND returns array, map to get every Shop out
    res.json({shops: shops.map((shop => shop.toObject({getters:true})))})
})

//EDIT shop name with ID
router.post("/shops/user/update/:sid", async(req,res)=>{
    const {name,adresse} = req.body
    const shopId = req.params.sid
    let shop = await Shop.findById(shopId);

    shop.name = name;
    shop.adresse = adresse;

   await shop.save().then(shop=> res.json({shop: shop.toObject({getters:true})}))

})

//DELETE a Shop with ID
router.delete("/shops/user/delete/:sid",async(req,res)=>{
    const shopId = req.params.sid
    const shop = await Shop.findById(shopId).populate("creator")
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await shop.remove({session:sess})
    shop.creator.shop.pull(shop);
    await shop.creator.save({session:sess})
    await sess.commitTransaction();
    res.json("Shop deleted");
})

module.exports = router