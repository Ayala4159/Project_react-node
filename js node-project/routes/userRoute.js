const express=require("express")
const router=express.Router()
const {addUser,login}=require("../controllers/userController")

router.post("/register",addUser)
router.post("/login",login)

module.exports=router

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODUwMGE2NTRkMmVjZWVhN2RlN2E5MDIiLCJmaXJzdE5hbWUiOiJheWFsYSIsImxhc3ROYW1lIjoiZWxib2dlbiIsImVtYWlsIjoiaGFkYXNhNjUxOEBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjA1ODMyODQxNTkiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTc1MDA3NjE5N30.-NjQQjVLbpHLEZNHDMLflL8BNVky1ZXpQuk8XkC-Wzc