import { User } from '../models/user.model.js';
import {ApiError} from '../utils/apiError.js';
import {uploadCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/apiResponse.js'
export const userRegister = async (req,res)=>{
    console.log(req.body,'full boyd');
    console.log(req.files);
    const {fullname,email,username,password} = req.body
    console.log(fullname,'full name')
    if(
        [fullname,email,username,password].some((field)=> field?.trim() === "")
    
    ){
        throw new ApiError(400,'All fields are required')
    }
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,'User already existed')
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log('local path', avatarLocalPath);
    
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)
    console.log(avatar, 'avatar in cloudinary');
    
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || '',
        email,
        password,
        username : username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,'User Registered Successfully')
    )

}
export const userLogin = (req,res)=>{
    console.log('hello');
    
}

