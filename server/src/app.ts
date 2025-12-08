import express from "express";
import cors from "cors";
import authRouter from "../src/routers/auth.router";
import tradeRouter from "../src/routers/trade.router";
import googleRouter from "./routers/googleAuth.router";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/auth/google", googleRouter);

app.use("/api/trades", authMiddleware, tradeRouter);

export default app;
