require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5311
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
app.use(cors(corsOptions))
app.use(express.json())
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
const path=require("path")
connectDB()

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/user", require("./routes/userRoute"))
app.use("/api/product", require("./routes/productRoute"))
app.use("/api/basket", require("./routes/basketRoute"))


mongoose.connection.once("open", () => {
    console.log("connect to mongoDB")
    app.listen(PORT, () => console.log(`server running on port ${PORT}💻`))
})

mongoose.connection.on("error", (err) => console.log(err))
