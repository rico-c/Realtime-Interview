import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import ErrorBoundary from 'views/errorbundary';

Sentry.init({
  dsn: "https://0853047698cb46168af6e24143cea08f@o1041266.ingest.sentry.io/6010169",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  (<ConfigProvider locale={zhCN}>
    <ErrorBoundary >
      <App />
    </ErrorBoundary>
  </ConfigProvider>),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
