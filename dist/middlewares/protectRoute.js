import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
// To protect route
/**
 * Check if user provided token, if false send 400 response
 * If token is provided, verify the token, if false send 403,
 * If token is signed, check if the user still exits cos someone might be using an old token
 * If token is expored, throw new error
 */
export const protectRoute = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    //   Check if token is provided
    if (!authorization)
        return next(new AppError("No token provided", 400));
    const token = authorization.split(" ")[1];
    //   type DecodedToken = {
    //     id: string;
    //     iat: number;
    //     exp: number;
    //   };
    //   Promisify the verification process
    const verifiedToken = await new Promise((res, rej) => {
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, token) => {
            return res(token);
        });
    });
    // If token is not verified, user is unauthorized
    if (!verifiedToken)
        return next(new AppError("You are not logged. Log in to view this resource", 401));
    // Check if user still exists
    if (!(await User.findOne({ _id: verifiedToken.id })))
        return next(new AppError("User does not exist anymore", 401));
    // Call Next Middleware
    next();
});
//# sourceMappingURL=protectRoute.js.map