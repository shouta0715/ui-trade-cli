/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import windowOpen from "open";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type ServerOptions = {
  port: number;
  open: boolean;
  hostname: string;
};

async function startNextApp({ port, hostname, open }: ServerOptions) {
  const serverPath = `${__dirname}/../.next/standalone/server.js`;

  // 環境変数を設定
  const env = { ...process.env, PORT: String(port), HOST: hostname };

  // server.jsを子プロセスとして実行
  const serverProcess = spawn("node", [serverPath], {
    env,
    stdio: ["inherit", "inherit", "inherit"],
  });

  return new Promise<void>((resolve, reject) => {
    serverProcess.once("spawn", () => {
      if (open) {
        windowOpen(`http://${hostname}:${port}`);
      }
    });
    serverProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Next process exited with code ${code}`));
      }
    });
  });
}

export function startServer(options: ServerOptions) {
  return startNextApp(options);
}
