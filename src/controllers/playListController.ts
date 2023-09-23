import PlayList from "../models/playListModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { IPlayList, PlayListModel } from "../types/playListSchemaTypes.js";

//GET
export const getPlayList = catchAsync(async (req, res, next) => {
  type TReqQuery = {
    playlistID: string;
  };

  const query = PlayList.findOne({ id: req.params.playlistID });


  const data = await query;
  if (!data) return next(new AppError('Playlist does not exits', 400))
  res.status(200).json(data);
});

//POST
export const createPlayList = catchAsync(async (req, res, next) => {
  type TReqBody = {
       owner: string;
    payload:IPlayList
  };

  const { owner, payload} = req.body as TReqBody;
  //Check if user is in database
  const user = await User.findOne({id:owner});
  if (!user) return next(new AppError("User does not exist, cannot create playlist", 400));


  const result = await PlayList.insertMany(payload)
  //Update the document of the playlist owner in the databse

  const saveQueries = await Promise.all(result.map(el => User.updateOne({id:el.createdBy}, {$push:{playlists: el._id}})))
  res.status(201).json({
    status: "success",
    message: "Playlists have been created and saved",
    result,
  });
});

//DELETE
export const deletePlayList = catchAsync(async (req, res, next) => {
  const { playListId } = req.params;
  await PlayList.deleteOne({ playListId });
});
