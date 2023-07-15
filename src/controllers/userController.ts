import { Request } from "express";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getUser = catchAsync(async (req: Request, res, next) => {
  const {userID} = req.params;
  const user = await User.findOne({ _id: userID });

  if (!user) next(new AppError("User not found", 400));
  res.status(200).json({
    status: "success",
    message: "User Found",
    data: user,
  });
});


export const getUsers = catchAsync(async (req, res, next) => {
    console.log('Hello World');
    
    const result = await User.find()
    res.status(200).json({
        status:'succcess',
        data:result
    })
    
})