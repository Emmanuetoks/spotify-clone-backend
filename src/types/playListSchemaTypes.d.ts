import { Model, Schema } from "mongoose";

export interface IPlayList {
  name: string;
  description: string;
  id: { type: string; unique: (string | boolean)[] };
  owner: Schema.Types.ObjectId | string;
  images: any;
  dateAdded: string;
  lastPlayed: string;
  tracks: any;
  uri: string;
  createdBy:string;
}

export type PlayListModel = Model<IPlayList, {}, IPlayListMethods>;

export interface IPlayListMethods {}
