import dotenv from "dotenv";
dotenv.config()
import connentDB from "./db/index.js";
import { app, port } from "./app.js";

connentDB()
.then(() => {
    app.listen(port, () => {
        console.log("Server is running on PORT: ", port)
    })
})
.catch((err) => (
    console.log(`MONGO db connection FAILED !!!`, err)
))