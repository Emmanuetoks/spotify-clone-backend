import { Request } from "express";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { checkIfUserExists } from "../utils/checkIfUserExists.js";
import { getCategoryQueries } from "../services/categoryFeed.js";

export const getUser = catchAsync(async (req: Request, res, next) => {
  const { userID } = req.params;
  const { include } = req.query as { include: string };
  const fieldsToSelect = include.split(",");

  let query = User.findOne({ _id: userID });

  if (req.params.include) {
    query = query.select(fieldsToSelect);
  }

  if (fieldsToSelect.includes("playlist")) {
    query = query.populate("playlist");
  }
                                                        
  const user = await query;
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

  const query = User.findOneAndUpdate({ _id: userID }, { ...req.body });

  //Excecute the result of the query
  const result = await query;

  //send Response
  res.status(201).json({
    status: "successful",
    message: "User Updated",
    result,
  });
});

export const getUserPlaylists = catchAsync(async (req, res, next) => {
  const { userID }: { userID: string } = req.params;

  const userExists = await User.findOne({id:userID});

  if (!userExists) return next(new AppError("User Not Found", 400));

  const result = await User.findOne({ id: userID }).select('+playlists').populate('playlists')
  res.status(200).json({data:result.playlists});
});


// export const getUserPlayList = catchAsync(async (req, res, next) => {
//   const {userID}:{userID:string}= req.body

//   const query = PlayList.find({owner:userID})

// })

export const getUserFeed = catchAsync(async (req, res, next) => {
  let data = await Promise.all(
    getCategoryQueries("f409f459e629458db11f7806c054e99e", "cb053aceb73c46768098bf0ade834220", '80dbcc96af6a40619abeb1d61a3ad07f', 'bcc1ab195e684efd9a4dc834aca1f4f0'),
  );

  res.status(200).json({
    status: "success",
    total: data.length,
    data,
  });
});
