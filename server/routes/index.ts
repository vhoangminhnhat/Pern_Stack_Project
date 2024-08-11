import express from "express";
import hotelRouter from "./hotels";

const mountRouters = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/hotels", hotelRouter);
  app.use("/api/v1/authentications")
  return app;
};

export default mountRouters;
