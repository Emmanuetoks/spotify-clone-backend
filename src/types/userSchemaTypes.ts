import { Model, Schema } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  password: string;
  email: {type:string, unique:(string | boolean)[]};
  confirmPassword: string;
  accountType: string;
  accountPlan:string;
  playLists: Schema.Types.ObjectId[];
}


export interface UserMethods {}

export type UserModel = Model<IUser, {}, UserMethods>;
