import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(20,20,20,0.85)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        },
      }}
    />
    <App />
  </React.StrictMode>,
);
