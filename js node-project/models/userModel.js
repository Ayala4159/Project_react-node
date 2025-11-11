const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        uniqe:true
    },
    phoneNumber:{
        type:String
    },
    role:{
        type:String,
        enum:["manager","customer"]
    },
    password:{
        type:String,
        require:true
    }
},{})

module.exports =mongoose.model("User",userSchema)