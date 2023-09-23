import mongoose, { Schema } from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    id: {
        type: String,
        unique: [true, "Category Id must be unique"],
    },
    playlists: {
        type: [Schema.Types.ObjectId],
        ref: "Playlist",
    },
});
const Category = mongoose.model("Category", categorySchema);
categorySchema.virtual('type').get(function () { return 'category'; });
export default Category;
//# sourceMappingURL=categoryModel.js.map