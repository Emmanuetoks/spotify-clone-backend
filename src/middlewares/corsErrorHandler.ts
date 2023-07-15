import { NextFunction, Request, Response } from "express";



const addCorsHeaders = (req:Request, res:Response, next:NextFunction) => {
    const corsHeader = 'Access-Control-Allow'
    res.header({
        [`${corsHeader}-Origin`]:'*',
        [`${corsHeader}-Headers`]:'*',
    })

    if (req.method === 'OPTIONS') {
        
        res.setHeader(`${corsHeader}-Methods`, 'PUT, POST, PATCH, GET, DELETE')
        res.status(200).json({})
    }
    next()
}


export default addCorsHeaders