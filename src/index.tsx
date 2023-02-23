import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DevTools, loadServer } from "jira-dev-tool";
import "antd/dist/antd";
import { AppProvider } from "context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
loadServer(() => {
  root.render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <App />
      </AppProvider>
    </React.StrictMode>
  );
});

reportWebVitals();
