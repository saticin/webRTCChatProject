const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling", "flashsocket"],
});

app.use(cors());

const PORT = 3001;

app.post("/api/v1/users/register", async (req, res) => {
  try {
    const inputData = req.body;
    const response = await axios.post(
      `http://localhost:3003/ms_users/register`,
      inputData
    );

    return res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/users/login", async (req, res) => {
  try {
    const inputData = req.body;
    const response = await axios.post(
      `http://localhost:3003/ms_users/login`,
      inputData
    );

    return res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/users/authenticate", async (req, res) => {
  try {
    const inputData = req.body;
    const response = await axios.post(
      `http://localhost:3003/ms_users/authenticate`,
      inputData
    );
    // console.log("authenticate data:", inputData);
    return res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/chat/messageSave", async (req, res) => {
  try {
    const inputData = req.body;
    const response = await axios.post(
      `http://localhost:3002/ms_chat/messageSave`,
      inputData
    );
    // console.log("authenticate data:", inputData);
    return res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  res.send("Gateway working ...");
});

io.on("connection", (socket) => {
  // console.log(socket.id);
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("cancellended");
  });

  socket.on(
    "calluser",
    ({ userToCall, signalData, from, dialerEmail, name }) => {
      io.to(userToCall).emit("calluser", {
        signal: signalData,
        from,
        dialerEmail,
        name,
      });
    }
  );

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data);
  });
  socket.on("dialeremailadd", (fromEmail) => {});
  socket.on("message", ({ sender, message, identification, reciever, me }) => {
    io.to(reciever).emit("messageToReciever", { sender, message });
  });
});

server.listen(PORT, () => {
  console.log(`listning started on ${PORT}......`);
});
