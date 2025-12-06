import { Request, Response } from "express";
import * as service from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const data = await service.signUp(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
