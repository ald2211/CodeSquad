import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";
import AppInitializer from "./components/AppInitializer.jsx";
import { ToastContainer } from "react-toastify";
import { SocketContextProvider } from "./context/socketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <ToastContainer />
          <AppInitializer>
            <App />
          </AppInitializer>
        </BrowserRouter>
      </React.StrictMode>
    </SocketContextProvider>
  </Provider>
);
