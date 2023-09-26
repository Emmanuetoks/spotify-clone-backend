import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    display_name: {
        type: String,
    },
    id: {
        type: String,
        required: [true, 'User must have an Id'],
        unique: [true, 'User Id must be unique']
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
        validate: [
            function (val) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
            },
            "Not a valid email",
        ],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please provide a confirm password"],
        validate: [
            function (val) {
                return val === this.password;
            },
            "Password do not match",
        ],
    },
    type: {
        type: String,
        enum: ["user", "artist"],
        default: "user",
    },
    playlists: {
        type: [Schema.Types.ObjectId],
        ref: "Playlist",
        select: false
    },
    membership: {
        type: String,
        enum: ["free", "premium"],
        default: "free",
        select: false,
    },
});
//WHat is going on here
userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=userModel.js.map