import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const signUp = async ({ email, password }: any) => {
  const userValidate = await prisma.user.findUnique({ where: { email } });
  if (userValidate) throw new Error("User with the same email has existed!");

  if (!email || !password) throw new Error("Missing email or password");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return { user };
};

export const login = async ({ email, password }: any) => {
  if (!email || !password) throw new Error("Missing email or password");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  return { token, user };
};
