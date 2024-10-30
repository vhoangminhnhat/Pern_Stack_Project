import { Response } from "express";
import jwt from "jsonwebtoken";

export const getAvatar = (username: string, gender: string) => {
  const baseUrl = "https://avatat-placeholder.iran.liara.run";
  switch (gender) {
    case "male":
      return `${baseUrl}/public/boy?username=${username}`;
    case "female":
      return `${baseUrl}/public/girl?username=${username}`;
  }
};

export const generateTokens = async (userId: string, res: Response) => {
  let secret = Array.from({ length: 10 }, () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }).join("");

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "10d"
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });

  return token;
};
