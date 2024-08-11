import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateId } from "../utils/heplers";

const JWT_SECRET = generateId(35);

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(403).send("Forbidden");
    return;
  }
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: "1d",
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
