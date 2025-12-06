import { Request, Response } from "express";
import * as service from "../services/trade.service";

export const createTrade = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const data = await service.createTrade(userId, req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTrades = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const data = await service.getTrades(userId);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getOpenPositions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const positions = await service.getOpenPositions(userId);
    res.json(positions);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
