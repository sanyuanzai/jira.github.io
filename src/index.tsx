import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import "antd/dist/antd";
import { AppProvider } from "context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
loadDevTools(() => {
  root.render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
});

reportWebVitals();
