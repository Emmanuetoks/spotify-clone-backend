import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import { saveCategories, savePlaylists } from "./utils/scraper.js";
import { populate } from "dotenv";

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log("Error Ocured", err));

// try {
//   await saveCategories(['spotify-playlist.json', 'workout.json', 'editor-picks.json', 'mood.json',  ]);
//   console.log("Saved successfully");
// } catch (error) {
//   console.log(error);
// }

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});

mongoose.set("toJSON", { virtuals: true });
mongoose.set("toObject", { virtuals: true });