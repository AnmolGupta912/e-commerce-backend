import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
    {
        email:{
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            require: true
        }
        
    },
    {
        timestamp: true
    }
)

export const User = mongoose.model("User", userSchema) 