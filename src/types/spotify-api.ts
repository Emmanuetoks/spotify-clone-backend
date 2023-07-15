import { NextFunction, Response } from "express";

export type DecodedToken = {
    id: string;
    iat: number;
    exp: number;
  };

export type ControllerFunction = (req:any, res:Response, next:NextFunction)=>Promise<void>
