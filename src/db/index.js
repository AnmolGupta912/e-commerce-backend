import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connentDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        // console.log("MongoDB connect: Host: ",connectionInstance)

    } catch (err) {
        console.log("MongoDb connenttion failed: ", err)
        process.exit(1)
    }
}

export default connentDB