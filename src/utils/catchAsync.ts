import { NextFunction, Response } from "express"
import { ControllerFunction } from "../types/index.js"


const catchAsync = (fn:ControllerFunction) => {
    return (
        (req, res:Response, next:NextFunction) => fn(req, res, next).catch((err) => next(err))
    )
}




export default catchAsync