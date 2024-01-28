import React, { useContext, useState } from "react";
import { Button, TextField, Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Label, Phone, PhoneDisabled } from "@material-ui/icons";
import { SocketContext } from "../SocketContext";
import { Container } from "@mui/material";

const useStyle = makeStyles((theme) => ({
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
const Option = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    call,
    sendDialerEmailAdd,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyle();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={4} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Account Infor
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={4} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Make a Call
              </Typography>
              <TextField
                label="ID to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                  startIcon={<PhoneDisabled fontSize="large" />}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    callUser(idToCall);
                    sendDialerEmailAdd(localStorage.getItem("sessionData"));
                  }}
                  className={classes.margin}
                  startIcon={<Phone fontSize="large" />}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Option;
