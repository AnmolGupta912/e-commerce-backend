import {User} from '../models/user.model.js' 
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from "../utils/ApiResponse.js"


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false }) // by doing validation false we r tell mongoDB to ignore its custom validation like check requied field
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the tokens!!!")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    // get the required fields data from req.body
    // check the fields are not empty 
    // check if the email already exist in the db 
    // if not create user 
    // send the user in res without password and refresh token
    
    const {email, name, password} = req.body

    if (
        [name, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all field are required !!!")
    }

    const existedUser = await User.findOne(email)

    if (existedUser){
        throw new ApiError(409, "User with the same email already exist in Database!!!")
    }

    const user = await User.create({
        name,
        email,
        password
    }).select("-password")

    if (!user){
        throw new ApiError(502, "Something went wrong while creating user!!!")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, user, "Successfully created the user!!!"))

})

const loginUser = asyncHandler(async (req, res) => {
    // get the required fields data from req.body
    // check the fields are not empty 
    // check if the email exist in the db 
    // if not throw error 
    // if exist check the password is correct or not 
    // if not throw error 
    // if correct generate access token and refresh token 
    // save the refresh token in db for that user 
    // send the access token and refresh token in res

    const {email, password} = req.body

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all field are required !!!")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User not found !!!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials !!!")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const savedUser = await user.save({ validateBeforeSave: false })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            "user": savedUser,
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }, "User logged in successfully !!!"))
})


const logoutUser = asyncHandler(async (req, res) => {
    // get the refresh token from req.cookies 
    // check if the refresh token is not empty  

    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!!!")
    }

    await User.findByIdAndUpdate(userId, { refreshToken: null }, { new: true })

    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully !!!"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // get the refresh token from req.cookies
    // decode the refresh token and get the user id from it
    // check if the user exist in db and the refresh token is same as the one in db
    // if not throw error 
    // if yes generate new access token and refresh token 
    // save the new refresh token in db for that user 
    // send the new access token and refresh token in res

    const incomingRefreshToken = req.cookies?.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request!!!")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken?._id)

    if (!user || user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Invalid refresh token!!!")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const savedUser = await user.save({ validateBeforeSave: false })    

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            "user": savedUser,
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }, "Access token refreshed successfully !!!"))
})



