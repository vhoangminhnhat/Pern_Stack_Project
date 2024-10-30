import express from 'express';

const chatRouter = express.Router();

chatRouter.get("/messages", (req, res) => {
    res.send("Chat message feature");
})

export default chatRouter;