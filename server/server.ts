import express from "express";
import authRouters from "./routes/authentications";
import hotelRouter from "./routes/hotels";
import roomRouters from "./routes/rooms";
import userRouters from "./routes/users";

const app = express();
app.use(express.json());
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/authentications", authRouters);
app.use("/api/v1/rooms", roomRouters);
app.use("/api/v1/users", userRouters);

const PORT = process.env.PORT! || 1337;

app.listen(1337, () => {
  console.log(`Listening from ${PORT}`);
});
