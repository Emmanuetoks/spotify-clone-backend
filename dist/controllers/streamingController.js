import { createReadStream } from "fs";
import catchAsync from "../utils/catchAsync.js";
export const getTrack = catchAsync(async (req, res, next) => {
    const trackStream = createReadStream("one-piece_opening-8-crazy-rainbow.mp3");
    res.setHeader("Content-Type", "audio/mpeg");
    trackStream.pipe(res);
});
//# sourceMappingURL=streamingController.js.map