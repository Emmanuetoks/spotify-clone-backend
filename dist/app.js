import express from "express";
import userRoutes from "./routes/userRoute.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import bodyParser from "body-parser";
import AppError from "./utils/appError.js";
import addCorsHeaders from "./middlewares/corsErrorHandler.js";
import { loginUser, signUpUser } from "./controllers/authController.js";
import playListRoutes from "./routes/playListRoutes.js";
import categoeyRoutes from './routes/categoryRoutes.js';
import streamingRoutes from './routes/streamingRoute.js';
const app = express();
// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ROUTES
// app.get("/", async (req, res: Response) => {
//   const token = await axios.post(
//     "https://accounts.spotify.com/api/token",
//     `grant_type=client_credentials&client_id=${process.env.SPOTIFY_ID}&client_secret=${process.env.SPOTIFY_SECRET}`,
//     { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
//   );
//   process.env.SPOTIFY_TOKEN = token.data;
//   const firstAPI = await axios.get<string>(
//     "https://api.spotify.com/v1/browse/categories/mood/playlists",
//     {
//       headers: {                                                                                                                                                                 
//         Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
//       },
//     },
//   )
//   const read = fs.createReadStream(JSON.stringify(firstAPI.data));
//   const writeStream = fs.createWriteStream("./mood.json");
//   writeStream.write(JSON.stringify(firstAPI.data));
//   res.status(200).json({
//     status: "OK",
//     // data: token.data,
//     data: firstAPI.data,
//   });
// });
app.use(addCorsHeaders);
app.post("/signup", signUpUser);
app.post("/login", loginUser);
app.use('/api/v1/categories', categoeyRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/playlists", playListRoutes);
app.use("/api/v1/track", streamingRoutes);
app.all("*", (req, res, next) => {
    const error = new AppError("OH! OH!, it seems the route you are looking for does not exist", 400);
    next(error);
});
//GLOBAL ERROR HANDLER
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map