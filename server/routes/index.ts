import express from "express";
import authRouters from "./authentications";
import hotelRouter from "./hotels";
import roomRouters from "./rooms";
import userRouters from "./users";

const mountRouters = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/hotels", hotelRouter);
  app.use("/api/v1/authentications", authRouters);
  app.use("/api/v1/rooms", roomRouters);
  app.use("/api/v1/users", userRouters)
  return app;
};

export default mountRouters;
