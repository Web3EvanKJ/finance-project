import { Router } from "express";
import { googleAuthController } from "../controllers/googleAuth.controller";

const router = Router();

// Frontend will redirect user to this Google URL
router.get("/login", (req, res) => {
  const redirect = `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${process.env.GOOGLE_CLIENT_ID}
&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}
&response_type=code
&scope=email%20profile`.replace(/\n/g, "");

  res.redirect(redirect);
});

// Google redirects user back here
router.get("/callback", googleAuthController.login);

export default router;
