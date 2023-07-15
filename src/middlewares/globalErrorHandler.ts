import { ErrorHandler, NextFunction } from "express"
import { Request } from "express/lib/request.js"
import { Response } from "express/lib/response.js"

const globalErrorHandler:ErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || 400;
    
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err   
    })


}




export default globalErrorHandler

