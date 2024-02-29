/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import path from "path";
import { fileURLToPath } from "url";
import history from "connect-history-api-fallback";
import express from "express";

// 現在のファイルのディレクトリパスを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  app.get("/api/users", (req, res) => {
    return res.json({ users: [{ name: "John Doe" }] });
  });

  app.use(history());

  app.use(
    express.static(path.join(__dirname, "../../dist/client"), {
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      },
    })
  );

  return app;
}

export async function startServer() {
  const app = createApp();

  return new Promise((resolve, reject) => {
    app
      .listen(3421)
      .once("listening", () => {
        if (process.env.TS_NODE_DEV) {
          console.log("🚀 Server is ready.");
        } else {
          // const { name, host } = resolveHostname(hostname);

          console.log(`👀 Preview: )`);
          // if (host) console.log(`🌏 NetWork: http://${host}:${port}`);
        }
        // if (shouldOpen) open(`http://localhost:${port}`);
        // resolve(server);
      })
      .once("error", async (err) => {
        if (err.message.includes("EADDRINUSE")) {
          console.log(
            `💡 ポートは既に使用されています。別のポートで起動中…`,
            err
          );
          // const server = await startServer({ ...options, port: port + 1 });
          // resolve(server);
        } else {
          reject(err);
        }
      });
  });
}

startServer();
