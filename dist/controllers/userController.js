import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
export const getUser = catchAsync(async (req, res, next) => {
    const { userID } = req.params;
    const user = await User.findOne({ _id: userID });
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
        status: 'succcess',
        data: result
    });
});
//# sourceMappingURL=userController.js.map