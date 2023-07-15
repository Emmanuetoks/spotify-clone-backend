import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";


const PORT = process.env.PORT || 3000
const DB = process.env.DATABASE

mongoose
  .connect(DB)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log("Error Occured", err));

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
