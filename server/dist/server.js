"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentications_1 = __importDefault(require("./routes/authentications"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/hotels", hotels_1.default);
app.use("/api/v1/authentications", authentications_1.default);
app.use("/api/v1/rooms", rooms_1.default);
app.use("/api/v1/users", users_1.default);
const PORT = process.env.PORT || 1337;
app.listen(1337, () => {
    console.log(`Listening from ${PORT}`);
});
