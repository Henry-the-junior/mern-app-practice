import express from "express";

import bodyParser from "body-parser";
// body-parser(https://www.npmjs.com/package/body-parser)

import mongoose from "mongoose";
import cors from "cors";
// cors(https://www.npmjs.com/package/cors)
// Learn CORS In 6 Minutes(https://www.youtube.com/watch?v=PNtFSVU-YTI)

import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* TEST DATA */
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES 的部分，
   會分為 (ROUTES WITH FILES) 和 (ROUTES)，
   是因為 (ROUTES WITH FILES) 寫在這可以直接使用到 (upload)，
   而 (ROUTES) 沒有需要使用到，就寫到 (/routes) 中管理。 */

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
/* 在 post (/auth/register) 時，
   會呼叫 (upload.single("picture")) 這個 Middleware，
   也會呼叫 (/controllers/auth.js) 中的 register。 */
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
// 連接 MongoDB
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
