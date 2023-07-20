import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "User must have a password"],
        minLength: [4, "Password must be at least 4 characters long"],
        select: false,
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: [true, "User emails must be unique"],
        validate: [function (val) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
            }, 'Not a valid email']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide a confirm password'],
        validate: [
            function (val) {
                return val === this.password;
            },
            "Password do not match",
        ],
    },
    accountType: {
        type: String,
        enum: ["free", "premium"],
        default: "free",
    },
    playLists: {
        type: [Schema.Types.ObjectId],
        ref: 'PlayList',
    },
    accountPlan: {
        type: String,
        enum: ['normal', 'artist'],
        default: 'normal',
    }
});
userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=userModel.js.map