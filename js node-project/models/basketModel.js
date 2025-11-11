const mongoose =require("mongoose")

const basketSchema=new mongoose.Schema({
    customer:{
        type:String,
        require:true,
        ref:"User"
    },
    product:{
        type:String,
        require:true,
        ref:"Product"
    },
    amount:{
        type:Number,
        default:1,
        require:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Basket",basketSchema)
