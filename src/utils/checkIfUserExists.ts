import User from "../models/userModel.js";

export const checkIfUserExists = async (userID: string) => {
  const verdict = (await User.findOne({ _id: userID })) ? true : false;
  return verdict;
};
