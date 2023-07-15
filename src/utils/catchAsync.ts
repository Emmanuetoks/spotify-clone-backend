import { NextFunction, Response } from "express"

type ControllerFunction = (req:any, res:Response, next:NextFunction)=>Promise<void>

const catchAsync = (fn:ControllerFunction) => {
    return (
        (req, res, next) => fn(req, res, next).catch((err) => next(err))
    )
}




export default catchAsync