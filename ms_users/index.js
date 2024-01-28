import express from "express";
// const server = require("http").createServer(app);
import cors from "cors";
import authRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(cors());

const PORT = 3003;

app.use("/ms_users", authRouter);

app.get("/", (req, res) => {
    res.send(`User micro service is running on ${PORT} ...`);
});

// app.post("/ms_users/register", (req, res) => {
//     console.log(req.body)
//     res.send(`User micro service is running on ${PORT} ...`);
// });

app.listen(PORT, () => {
    console.log(`User micro service is running on ${PORT} ...`);
});
