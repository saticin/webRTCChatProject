import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "200px",
    height: "200px",
  },
  videoForieng: {
    width: "250px",
    height: "250px",
  },
  gridContainer: {
    justifyContent: "center",
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      {stream && console.log("xx")}
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {localStorage.getItem("sessionData") || { name }}
          </Typography>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      </Paper>

      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.videoForieng}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
