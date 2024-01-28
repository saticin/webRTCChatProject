import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import Messages from "../components/Message";
import Option from "../components/Option";
import Notifications from "../components/Notifications";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Call = () => {
  const cookies = document.cookie.split(";");
  const navigate = useNavigate();
  const checkAuthenticate = async () => {
    const uid = Cookies.get("uid");
    const token = Cookies.get("jwtToken");
    const respond = await axios.post(
      "http://localhost:3001/api/v1/users/authenticate",
      { uid, token }
    );

    return respond.data;
  };
  (async () => {
    const result = await checkAuthenticate();
    if (result !== "Ok") {
      navigate("/");
    }
  })();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "75%" }}>
        <VideoPlayer />
        <Option>
          <Notifications />
        </Option>
      </div>
      <div style={{ width: "25%", backgroundColor: "white" }}>
        <Messages></Messages>
      </div>
    </div>
  );
};
