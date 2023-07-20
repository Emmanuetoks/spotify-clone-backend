import mongoose, { Schema } from "mongoose";
const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    playListId: {
        type: String,
        required: [true, 'Playlist must have an "PlaylistId"'],
        unique: [true, 'Playlist must have a unique "PlaylistId"']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});
const PlayList = mongoose.model('Playlist', playListSchema);
export default PlayList;
//# sourceMappingURL=playListModel.js.map