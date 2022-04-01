import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "store";

import App from "views";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "components/ErrorBoundary";


render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
