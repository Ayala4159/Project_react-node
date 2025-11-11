const mongoose=require("mongoose")

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch(err){
        console.error("😤😟😞error connections to DB😤😟😞\n"+err)
    }
}
module.exports=connectDB