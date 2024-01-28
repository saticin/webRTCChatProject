import React from "react";
import ReactDOM from "react-dom/client"; // 'react-dom/client';
import "./styles.css";
import App from "./App"; //'./App';
import { ContextProvider } from "./SocketContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
