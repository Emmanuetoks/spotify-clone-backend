import { Model, Schema } from "mongoose";

export interface IUser {
  display_name: string;
  password: string;
  id:{type:string, unique:(string |boolean)[]};
  email: {type:string, unique:(string | boolean)[]};
  confirmPassword: string;
  type: string;
  membership:string;
  playlists: Schema.Types.ObjectId[];
}


export interface UserMethods {}

export type UserModel = Model<IUser, {}, UserMethods>;
