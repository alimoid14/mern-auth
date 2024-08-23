import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* -----------------App routes here--------------- */

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //It allows us to parse incoming requests with JSON payloads: req.body
app.use(cookieParser()); //It allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//Listen on localhost for dev environment
app.listen(PORT, () => {
  connectDB();
  console.log("Server is on and up on port:", PORT);
});
