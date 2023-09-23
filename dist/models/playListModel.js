import mongoose, { Schema } from "mongoose";
import { log } from "console";
const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    id: {
        type: String,
        required: [true, 'Playlist must have an "PlaylistId"'],
        unique: [true, 'Playlist must have a unique "PlaylistId"'],
    },
    owner: {
        type: Schema.Types.Mixed,
        ref: "User",
    },
    images: {
        type: [Schema.Types.Mixed],
    },
    dateAdded: {
        type: String,
    },
    lastPlayed: {
        type: String,
    },
    tracks: {
        type: Schema.Types.Mixed,
    },
    uri: String,
    createdBy: String,
});
playListSchema.pre("save", async function (next) {
    log("Olee way");
    this.createdBy = undefined;
    next();
});
const PlayList = mongoose.model("Playlist", playListSchema);
playListSchema.virtual("type").get(function () {
    return "playlist";
});
export default PlayList;
//# sourceMappingURL=playListModel.js.map