import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "@/client/app";
import { Providers } from "@/client/features/providers";
import { Layout } from "@/client/layouts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Layout>
        <App />
      </Layout>
    </Providers>
  </React.StrictMode>
);
