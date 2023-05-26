import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";

import { runDB } from "./db/index.js";
import { cors, config } from "./config/config.js";

const app = express();
const server = createServer(app);

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/media", express.static("./media"));

app.use("/api", userRouter);
app.use("/api/admin", adminRouter);

server.listen(config.server.PORT, () => {
  console.log("\x1b[34m%s\x1b[0m", `Listening on port! ${config.server.PORT}!`);
});

runDB();
