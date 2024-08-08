import express, { Request, Response } from 'express';
import moment from 'moment';

const app = express();

app.get("/api/v1/restaurant-list", (req: Request, res: Response) => {
    res.status(200).json({
        data: [
            {
                id: "12341234",
                name: "Restaurant A",
                code: "resA",
                createdAt: moment().format("DD/MM/YYYY HH:mm:ss")
            }
        ],
        message: "Get restaurant list successfully"
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening from ${PORT}`)
})