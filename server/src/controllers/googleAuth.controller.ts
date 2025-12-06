import { Request, Response } from "express";
import { googleAuthService } from "../services/googleAuth.service";

export const googleAuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const code = req.query.code as string;

      const googleUser = await googleAuthService.getGoogleUser(code);

      const result = await googleAuthService.loginOrCreate(
        googleUser.id,
        googleUser.email
      );

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
