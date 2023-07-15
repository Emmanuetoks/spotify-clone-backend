import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jsonwebtoken from 'jsonwebtoken';
export const signUpUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username || 'Rnadomuser2839',
        confirmPassword: req.body.confirmPassword
    });
    const token = jsonwebtoken.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
        status: 'success',
        message: 'User created',
        token,
        // data:newUser
    });
});
//# sourceMappingURL=authController.js.map