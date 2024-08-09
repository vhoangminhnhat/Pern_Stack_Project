import express from "express";
import hotelRouter from "./hotels";

const mountRouters = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/hotels/list", hotelRouter);

  app.use("/api/v1/hotels/details/:hotelId", hotelRouter);

  //Get restaurant info
  app.get("/api/v1/hotels/details/:id", hotelRouter);

  
  app.post("/api/v1/hotels/create-hotel", hotelRouter);
  return app;
};

export default mountRouters;
