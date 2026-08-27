import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        email:{
            type: String,
            unique: true,
            required: true,
        },
        name:{
            type: String,
            require: true
        },
        password: {
            type: String,
            required: true
        },
        wishList: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generatorAcessToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generatorRefreshToken = function () {
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