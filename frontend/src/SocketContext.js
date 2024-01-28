import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
const SocketContext = createContext();
const socket = io("http://localhost:3001");
//const socket = io('https://webrtc-chat-service.onrender.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [chat, setChat] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        try {
          myVideo.current.srcObject = currentStream;
        } catch (error) {}
      });

    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal, dialerEmail }) => {
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
        dialerEmail: dialerEmail,
      });
    });
    socket.on("messageToReciever", ({ sender, message }) => {
      setChat((prev) => [...prev, { sender: sender, message: message }]);
    });
  }, []);
  const mediaOff = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: false });
    // .then((currentStream) => {
    //   setStream(currentStream);
    //   try {
    //     myVideo.current.srcObject = currentStream;
    //   } catch (error) {}
    // });
  };
  const sendMessage = (message) => {
    if (message.trim() !== "") {
      socket.emit("message", {
        reciever: call.from || call.me,
        sender: me,
        identification: call.answersEmail || call.dialerEmail,
        message,
        me,
      });
      setChat((prev) => [...prev, { sender: me, message: message }]);
    }
  };

  const sendDialerEmailAdd = (fromemail) => {
    socket.emit("dialeremailadd", fromemail);
  };
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      const answersEmail = localStorage.getItem("sessionData");
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        answersEmail,
        me,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    const callerEmail_01 = localStorage.getItem("sessionData");
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        dialerEmail: callerEmail_01,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, answersEmail, me }) => {
      setCall({ answersEmail, me });
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        chat,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        sendMessage,
        sendDialerEmailAdd,
        mediaOff,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
