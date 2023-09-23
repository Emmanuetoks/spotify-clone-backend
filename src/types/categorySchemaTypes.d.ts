import { KeyExportOptions } from "crypto";
import { Model, Schema } from "mongoose";

export interface CategorySchema {
   name:string;
     id:{type:string, unique:(string|boolean)[]}
   playlists:Schema.Types.ObjectId[]
}

export type CategoryModel = Model<CategorySchema,{}, CategoryModelMethods>


export interface CategoryModelMethods {
   formatPlaylistField: () => void
} 