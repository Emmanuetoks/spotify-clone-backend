import express from "express";
import { getUser, getUserFeed, getUserPlaylists, getUsers, updateUser } from "../controllers/userController.js";
import { signUpUser } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { get } from "express/lib/request.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/feed").get( getUserFeed)

router.route("/:userID").get(getUser).patch(updateUser);
router.route('/:userID/playlists').get(getUserPlaylists)
export default router;
