import { StrictMode } from "react";
import { render } from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

import "./index.css";

render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
  document.getElementById("root")
);
