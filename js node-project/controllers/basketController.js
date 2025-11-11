const Basket=require("../models/basketModel")
const User=require("../models/userModel")
const Product=require("../models/productModel")
//getBasketByUser
const getBasketByUserId = async (req,res)=>{
    const {id} = req.params
    const products = await Basket.find({customer:id}).populate("product")
    if(!products||!products.length)
        return res.status(400).json({message:'no products found'})
    res.json(products)
}

//addToBasket
const addToBasket=async(req,res)=>{
    const {custId,prodId}=req.params
    const user=await User.findById(custId).lean()
    const product=await Product.findById(prodId).lean()
    if(!user||!product)
        return res.status(401).json({message:"Unauthorized"})
    const basket=await Basket.findOne({customer:custId,product:prodId}).exec()
    if(basket){
        return res.status(409).json({message:`product: ${product.name} is already exists on your basket`})
    }
    const newProduct=await Basket.create({customer:custId,product:prodId})
    res.status(201).json({message:`${product.name} added to your basket`})
}

//updateBasket
const updateBasket=async(req,res)=>{
    const {custId,prodId,amount}=req.params
    const user=await User.findById(custId).lean()
    const product=await Product.findById(prodId).lean()
    if(!user||!product)
        return res.status(401).json({massage:"Unauthorized"})
    const basket=await Basket.findOne({customer:custId,product:prodId}).exec()
    if(!basket)
        return res.status(400).json({massage:"product not found at the basket"})
        basket.amount+=Number(amount)
    const updateBasket=basket.save()
    res.status(201).json({amount:updateBasket.amount})
    }

    //deleteProductFromBasket
const deleteProductFromBasket=async(req,res)=>{
    const {custId,prodId}=req.params
    const user=await User.findById(custId).lean()
    const product=await Product.findById(prodId).lean()
    if(!user||!product)
        return res.status(401).json({massage:"Unauthorized"})
    const basket=await Basket.findOne({customer:custId,product:prodId}).exec()
    if(!basket)
        return res.status(400).json({massage:"product not found at the basket"})
    const result=await basket.deleteOne()
    res.status(201).json({massage:`product ${product.name} deleted from basket`})
}
module.exports={getBasketByUserId,addToBasket,updateBasket,deleteProductFromBasket}