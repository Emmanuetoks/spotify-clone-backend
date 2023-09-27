import express from 'express';
import { getTrack } from '../controllers/streamingController.js';
const router = express.Router();
router.get("/:trackID", getTrack);
export default router;
//# sourceMappingURL=streamingRoute.js.map