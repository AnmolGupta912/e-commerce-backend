import {User} from '../models/user.model.js' 
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from "../utils/ApiResponse.js"

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