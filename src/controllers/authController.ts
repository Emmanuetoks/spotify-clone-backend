import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { LoginRequestBody } from "../types/spotify-api.js";

export const signUpUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    
        const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username || 'Rnadomuser2839',
        confirmPassword:req.body.confirmPassword
    })

    res.status(200).json({
        status:'success',
        message:'User created',
        data:newUser
    })
})


export const loginUser = catchAsync(async (req, res, next) => {
    const {email, password}:LoginRequestBody = req.body
    
    const user = await User.findOne({email}).select('name _id email password')
    
    // If user is not found throw error
    if (!user) next(new AppError('User not found', 400))
    
    const verifyPassword = await bcrypt.compare(password,  user.password)
    
    
    // If passwords do not match throw error
    if (!verifyPassword) next(new AppError('Passwords do not match', 400))
  
    console.log(verifyPassword,user);
    
    
    // Send token to user after he has signued up
    const token = jsonwebtoken.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})
    user.password = undefined
    res.status(200).json({
        status:'success',
        message:'Login successful',
        user,
        token
    })

  })