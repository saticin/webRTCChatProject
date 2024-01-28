import React, { useContext, useState, useEffect } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@mui/styles";

import axios from "axios";
import { Send } from "@material-ui/icons";
import { SocketContext } from "../SocketContext";
//import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

const Messages = () => {
  const { sendMessage, call, me, chat } = useContext(SocketContext);
  const [message, setMassage] = useState("");
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    message: "",
    frommail: "",
    tomail: "",
    fromid: "",
    toid: "",
    msgdate: "",
  });

  const setDatatoInput = () => {
    setInputs(() => {
      return;
    });
  };
  const handleSendMessage = async () => {
    //preventDefault();

    //setDatatoInput();
    console.log("Message Data : ", inputs);
    sendMessage(message);
    const result = await axios.post(
      "http://localhost:3001/api/v1/chat/messageSave",
      {
        message: message,
        frommail: localStorage.getItem("sessionData"),
        tomail: call.answersEmail || call.dialerEmail,
        fromid: me,
        toid: call.from || call.me,
      }
    );
    console.log("return message : ", result);
    setMassage("");
  };

  const renderMessages = () => {
    const markup = chat.map(
      (item) => `
    <div style={{ backgroundColor: "#82F9F2", marginTop: 8, padding: 8 }}>
      ${item.message}
    </div>`
    );
    console.log(markup);
  };

  useEffect(() => {
    // const markup = chat.map(
    //   (item) => `
    // <div style={{ backgroundColor: "#82F9F2", marginTop: 8, padding: 8 }}>
    //   ${item.message}
    // </div>`
    // );
    // console.log(markup);
    console.log(chat);
  }, [chat]);

  return (
    <Paper
      elevation={10}
      className={classes.paper}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <h2>Chat</h2>

      <div
        style={{
          height: "100%",
          width: "100%",
          marginTop: 12,
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        {chat.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.sender == me ? "#93F892" : "#50B2FB",
              marginTop: 8,
              padding: 8,
            }}
          >
            {item.message}
          </div>
        ))}
      </div>
      <form>
        <TextField
          label="message ......"
          value={message}
          name="message"
          onChange={(e) => setMassage(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSendMessage}
          // className={classes.margin}
          startIcon={<Send fontSize="large" />}
        >
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default Messages;
