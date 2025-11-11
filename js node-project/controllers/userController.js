const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//sign in
const addUser = async(req,res)=>{
    const {firstName,lastName,email,phoneNumber,password} = req.body
    if( !firstName || !lastName || !email || !password)
        res.status(400).json({message:`all fields are required`})
    let role = 'customer'
    const user = await User.findOne({email}).lean()
    if(user)
        return res.status(409).json({message:`duplicate username`})
    if(email === process.env.MANAGER_EMAIL && password === process.env.MANAGER_PASSWORD)
        role = 'manager'
    const hashedPwd = await bcrypt.hash(password, 10)
    //בדיקה אם המשתמש החדש הוא מנהל , אם כן לשלוח מנהל עבור השדה התפקיד : 
    const newUser = await User.create({firstName,lastName,email,phoneNumber,role,password:hashedPwd})
    if(newUser)
        return res.status(201).json({message:`new user: ${firstName} created`})
    return res.status(500).json({message:`user was not create`})
}

//login
const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
        return res.status(400).json({message:`all fields are required`})
    const currentUser = await User.findOne({email}).lean()
    if(!currentUser)
        return res.status(401).json({message:`Unauthorizes 1`})
    const match = await bcrypt.compare(password,currentUser.password)
    if(!match)
        return res.status(401).json({message:`Unauthorized 2`})
    const userInfo = {_id:currentUser._id,firstName:currentUser.firstName,lastName:currentUser.lastName,email:currentUser.email,phoneNumber:currentUser.phoneNumber,role:currentUser.role}
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.status(201).json({accessToken,role:currentUser.role})
}
module.exports = {addUser,login}
