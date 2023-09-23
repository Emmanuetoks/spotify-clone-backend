import mongoose, { Schema } from "mongoose";
import { CategoryModel, CategorySchema } from "../types/categorySchemaTypes.js";

const categorySchema = new mongoose.Schema<CategorySchema>({
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

const Category = mongoose.model<CategorySchema, CategoryModel>("Category", categorySchema);
 
categorySchema.virtual('type',).get(function(){ return 'category'})
export default Category;
