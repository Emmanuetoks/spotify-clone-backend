import { Model, Schema } from "mongoose";

export interface IPlayList  {
    name:string;
    description:string;
    playListId:{type:string, unique:(string|boolean)[]};
    owner: Schema.Types.ObjectId;   
}



export type PlayListModel  = Model<IPlayList, {}, IPlayListMethods>


export interface IPlayListMethods  {

}
