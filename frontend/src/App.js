import React from "react";
import { Typography, AppBar } from "@mui/material";

import { Call } from "./pages/Call";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Loging from "./pages/Loging/Loging";
import { Messages } from "./pages/Message";

const App = () => {
  return (
    <div>
      <AppBar position="static" color="inherit">
        <Typography variant="h4" align="center">
          Video Chat
        </Typography>
      </AppBar>
      <Routes>
        <Route path="/" element={<Loging></Loging>} />
        <Route path="/signup" element={<Register></Register>} />
        <Route path="/message" element={<Messages></Messages>} />
        <Route path="/call" element={<Call></Call>} />
      </Routes>
    </div>
  );
};
export default App;
