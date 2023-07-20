import PlayList from "../models/playListModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
//GET
export const getPlayLists = catchAsync(async (req, res, next) => {
    const result = await PlayList.find();
    res.status(200).json({ status: "success", data: result });
});
//POST
export const createPlayList = catchAsync(async (req, res, next) => {
    const { name, description, playlistid, owner } = req.body;
    //Check if user is in database
    const user = await User.findById(owner);
    if (!user)
        return next(new AppError("User does not exist, cannot create playlist", 400));
    const newPlayList = await PlayList.create({ name, description, playListId: playlistid, owner });
    //Update the document of the playlist owner in the databse
    await User.updateOne({ _id: owner }, { $push: { playLists: newPlayList._id } });
    res.status(201).json({
        status: "success",
        message: "New Playlist created",
        result: newPlayList,
    });
});
//DELETE
export const deletePlayList = catchAsync(async (req, res, next) => {
    const { playListId } = req.params;
    await PlayList.deleteOne({ playListId });
});
//# sourceMappingURL=playListController.js.map