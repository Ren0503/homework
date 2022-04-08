import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux";
import Background,{ ThemeProvider} from "./components/Background"; 

import * as ReactDOMClient from "react-dom/client";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <Background>
          <App />
        </Background>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
