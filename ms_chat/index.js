import express from "express";
// const server = require("http").createServer(app);
import cors from "cors";
import chatRouter from "./routes/chatRoute.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(cors());

const PORT = 3002;

app.use("/ms_chat", chatRouter);

app.get("/", (req, res) => {
    res.send(`User micro service is running on ${PORT} ...`);
});

app.listen(PORT, () => {
    console.log(`User micro service is running on ${PORT} ...`);
});
