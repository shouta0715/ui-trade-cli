import { Server } from "http";
import { watch } from "chokidar";
import { WebSocketServer } from "ws";

type StartFileWatcherProps = {
  server: Server;
  filePath: string;
};
export const startFileWatcher = async ({
  server,
  filePath,
}: StartFileWatcherProps) => {
  const ws = new WebSocketServer({ server });

  const ch = watch(filePath);

  ch.on("change", () => {
    ws.clients.forEach((client) => {
      client.send("reload");
    });
  });

  process.on("SIGINT", () => {
    ch.close();
    ws.close();
    process.exit();
  });
};
