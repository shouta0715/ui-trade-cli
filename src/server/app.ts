/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Server, createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import history from "connect-history-api-fallback";
import express, { Express } from "express";
import openWindow from "open";
import { logger } from "@/server/log";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function newApp() {
  const app = express();

  app.get("/api/users", (req, res) => {
    return res.json({ users: [{ name: "John" }] });
  });

  app.use(history());

  app.use(
    express.static(path.join(__dirname, "../client/"), {
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      },
    })
  );

  return app;
}

export type ServerOptions = {
  app: Express;
  port: number;
  open: boolean;
  hostname: string;
};

export async function startServer(options: ServerOptions): Promise<Server> {
  const { app, port, hostname, open } = options;

  const server = createServer(app);

  return new Promise((resolve, reject) => {
    server
      .listen(port, hostname)
      .once("listening", () => {
        logger().info(`🚀 Server is ready at http://${hostname}:${port}`).run();

        if (open) openWindow(`http://${hostname}:${port}`);

        resolve(server);
      })
      .once("error", async (err) => {
        if (err.message.includes("EADDRINUSE")) {
          logger()
            .warn(`Port ${port} は すでに使用されています。`)
            .next()
            .text(`別のポートで起動します...`)
            .run();

          const server2 = await startServer({ ...options, port: port + 1 });

          resolve(server2);
        } else {
          reject(err);
        }
      });
  });
}
