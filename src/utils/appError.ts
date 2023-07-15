interface AppError {
    status:string;
    statusCode:number;
    isOperational:Boolean;
}




class AppError extends Error{
    constructor(message:string, errCode:number) {
        super(message)
        this.status = 'error';
        this.statusCode = errCode;
        this.isOperational = true;
    }
}

export default AppError

export {AppError}