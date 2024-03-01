import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "@/client/app";
import { Providers } from "@/client/features/providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
