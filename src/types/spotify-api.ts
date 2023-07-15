import { NextFunction, Response } from "express";

export type DecodedToken = {
    id: string;
    iat: number;
    exp: number;
  };

export type ControllerFunction = (req:any, res:Response, next:NextFunction)=>Promise<void>


// REQUEST BODIES
export type LoginRequestBody = {
  email:string,
  password:string;
}


export type ApiResponse = {
  status:string;
  message:string;
  data?:object;
}

