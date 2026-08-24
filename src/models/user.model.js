import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
        },
        password: {
            type: String,
            required: true
        }
        
    },
    {
        timestamp: true
    }
)

// 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.method.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.method.generatorAcessToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generatorRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema) 