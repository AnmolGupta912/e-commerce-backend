import express from  "express"
import cookieParser from "cookie-parser"

const app =  express()
const port = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import
import userRoutes from "./routes/user.route.js"

// routes declaration
app.use("/api/v1/users", userRoutes)


export {app, port}