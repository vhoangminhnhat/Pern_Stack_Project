import jwt from "jsonwebtoken";

export const generateId = (length: number): string =>
  Array.from({ length }, () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }).join("");

export const tokenGeneration = (id: string) => {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, process.env.JWTSECRET!, { expiresIn: "24h" });
};
