import express from "express";
import { getUser, getUserFeed, getUserPlaylists, getUsers, updateUser } from "../controllers/userController.js";
const router = express.Router();
router.route("/").get(getUsers);
router.route("/feed").get(getUserFeed);
router.route("/:userID").get(getUser).patch(updateUser);
router.route('/:userID/playlists').get(getUserPlaylists);
export default router;
//# sourceMappingURL=userRoute.js.map