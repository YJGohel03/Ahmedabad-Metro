import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
    httpOnly:true,
    secure:true,
};

const registerHandle = asyncHandler( async(req, res) => {
    const {username, email, password} = req.body;
    console.log(req.body);

    if(!username || !email || !password){
        throw new ApiError(400, "All field are required for registration.");
    }

    if(password.trim().length < 8 || password.trim().length > 16){
        throw new ApiError(400, "password must contain 8 to 16 character.");
    }

    const isUserExist = await User.findOne({
        $or:[{ username }, { email }]
    });

    if(isUserExist){
        throw new ApiError(409, "User already exist.");
    }

    const createdUser = await User.create({
        username,
        email,
        password,
    });
    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully."))
        
});
const loginhandle = asyncHandler( async(req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    if(!username || !password){
        throw new ApiError(400, "All field are required for login.")
    }

    const isUser = await User.findOne({username});
    if(!isUser){
        throw new ApiError(404, "User not found.");
    }
    const isCorrectPassword = await isUser.comparePassword(password);
    
    if(!isCorrectPassword){
        throw new ApiError(401, 'Invalid credentials.');
    }
    
    const accessToken = await isUser.generateAccessToken();
    const user = await User.findById(isUser._id).select('-password');
    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .json(new ApiResponse(200, user, "User logged in successfull."));
})

export {
    registerHandle,
    loginhandle,
}