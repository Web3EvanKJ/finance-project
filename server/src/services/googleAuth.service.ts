import axios from "axios";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const googleAuthService = {
  async getGoogleUser(code: string) {
    // 1. Exchange code for token
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    });

    const accessToken = tokenRes.data.access_token;

    // 2. Fetch Google profile
    const profileRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return profileRes.data;
  },

  async loginOrCreate(googleId: string, email: string) {
    let user = await prisma.user.findUnique({ where: { googleId } });

    // If first time using Google login
    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId,
          email,
        },
      });
    }

    // Issue JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return { user, token };
  },
};
