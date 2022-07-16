// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import Raven from 'raven-js';

function init() {
  Raven.config("https://23a0ef4678154caba256b3d7aef46afc@o1313443.ingest.sentry.io/6563590", { 
    release: "1-0-0",
    environment: "development-test",
  }).install();

// Sentry.init({
//   dsn: "https://23a0ef4678154caba256b3d7aef46afc@o1313443.ingest.sentry.io/6563590",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
}