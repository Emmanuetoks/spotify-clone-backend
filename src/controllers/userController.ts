import { Request } from "express";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";

export const getUser = catchAsync(async (req: Request, res, next) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });

  if (!user) next(new AppError("User not found", 400));
  res.status(200).json({
    status: "success",
    message: "User Found",
    data: user,
  });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const result = await User.find();
  res.status(200).json({
    status: "succcess",
    data: result,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const userID: string = req.params.user_id;
  type TReqBody = {
    playlists?: string[];
    name?: string;
    accountPlan?: string;
  };

  let reqBody: TReqBody = { ...req.body };

  const query = User.findOneAndUpdate({ _id: userID }, {...req.body});

  //Excecute the result of the query
  const result = await query;

  //send Response
  res.status(201).json({
    status: "successful",
    message: "User Updated",
    result,
  });
});
