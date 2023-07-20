import mongoose, { Model, Schema } from "mongoose";
import { PlayListModel, IPlayList } from "../types/playListSchemaTypes.js";



const playListSchema = new mongoose.Schema<IPlayList>({
    name: {
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    
    playListId:{
        type:String,
        required:[true, 'Playlist must have an "PlaylistId"'],
        unique:[true, 'Playlist must have a unique "PlaylistId"']
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
})

const PlayList = mongoose.model<IPlayList, PlayListModel>('Playlist', playListSchema)

export default PlayList