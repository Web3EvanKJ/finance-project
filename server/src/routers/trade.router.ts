import { Router } from "express";
import * as controller from "../controllers/trade.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware);

router.post("/", controller.createTrade);
router.get("/", controller.getTrades);
router.get("/positions", controller.getOpenPositions);

export default router;
