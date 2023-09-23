import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getCategoryQueries } from "../services/categoryFeed.js";
export const getUser = catchAsync(async (req, res, next) => {
    const { userID } = req.params;
    const { include } = req.query;
    const fieldsToSelect = include.split(",");
    let query = User.findOne({ _id: userID });
    if (req.params.include) {
        query = query.select(fieldsToSelect);
    }
    if (fieldsToSelect.includes("playlist")) {
        query = query.populate("playlist");
    }
    const user = await query;
    if (!user)
        next(new AppError("User not found", 400));
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
    const userID = req.params.user_id;
    const query = User.findOneAndUpdate({ _id: userID }, Object.assign({}, req.body));
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
    const { userID } = req.params;
    const userExists = await User.findOne({ id: userID });
    if (!userExists)
        return next(new AppError("User Not Found", 400));
    const result = await User.findOne({ id: userID }).select('+playlists').populate('playlists');
    res.status(200).json({ data: result.playlists });
});
// export const getUserPlayList = catchAsync(async (req, res, next) => {
//   const {userID}:{userID:string}= req.body
//   const query = PlayList.find({owner:userID})
// })
export const getUserFeed = catchAsync(async (req, res, next) => {
    let data = await Promise.all(getCategoryQueries("c9bacecb2f3346b08353839b4a93c411", "0ea070e408934eec9a3011f373bce1be", 'cacce5f7766244918fbd6a45bc3d222d'));
    res.status(200).json({
        status: "success",
        total: data.length,
        data,
    });
});
//# sourceMappingURL=userController.js.map