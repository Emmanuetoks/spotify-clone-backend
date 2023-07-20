import express from 'express';
import { getUser, getUsers, updateUser } from '../controllers/userController.js';
import { protectRoute } from '../middlewares/protectRoute.js';
const router = express.Router();
router.route('/').get(protectRoute, getUsers);
router.route('/:userID').get(getUser).patch(updateUser);
export default router;
//# sourceMappingURL=userRoute.js.map