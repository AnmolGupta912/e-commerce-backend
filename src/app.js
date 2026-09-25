import express from  "express"
import cookieParser from "cookie-parser"

const app =  express()
const port = process.env.PORT 

app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"

// routes declaration
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)


export {app, port}