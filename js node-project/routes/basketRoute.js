const express=require("express")
const verifyJWT=require("../middleware/verifyJWT")

const { getBasketByUserId, addToBasket, updateBasket, deleteProductFromBasket } = require("../controllers/basketController")
const router=express.Router()

router.get("/:id",verifyJWT,getBasketByUserId)
router.post("/:custId/:prodId",verifyJWT,addToBasket)
router.put("/:custId/:prodId/:amount",verifyJWT,updateBasket)
router.delete("/:custId/:prodId",verifyJWT,deleteProductFromBasket)

module.exports=router