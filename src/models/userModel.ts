import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

interface UserType {
  name: string;
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
  accountType: string;
  playlists: UserPlayListType[];
}

type UserPlayListType = {
  name: string;
};

interface UserMethods {}

type UserModel = Model<UserType, {}, UserMethods>;

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
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    required: [true, "User must have an email"],
    unique: [true, "User emails must be unique"],
  },
  confirmPassword: {
    type: String,
    required:[true, 'Please provide a confirm password'],
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
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model<UserType, UserModel>("User", userSchema);

export default User;
