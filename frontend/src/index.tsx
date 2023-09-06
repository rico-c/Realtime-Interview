import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "./index.scss";
import App from "./App";
import { ConfigProvider } from "antd";
import { StyleProvider } from '@ant-design/cssinjs';
import zhCN from "antd/lib/locale/zh_CN";
// import ErrorBoundary from "views/errorbundary";

Sentry.init({
  dsn: "https://0853047698cb46168af6e24143cea08f@o1041266.ingest.sentry.io/6010169",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: "#0582ca",
        colorLink: "#0582ca",
        colorWarning: "#faad14",
        colorError: "#ff6670",
      },
    }}
  >
    <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </ConfigProvider>
);
