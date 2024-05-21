import { ServerOptions, startServer } from "@/server/app";
import { logger } from "@/server/log";
import { CommandFn } from "@/server/types";
import { parseArgs } from "@/server/utils";
import { previewHelpText } from "@/server/utils/text";

const type = {
  "--port": Number,
  "--open": Boolean,
  "--help": Boolean,
  "--host": String,
  "--no-watch": Boolean,

  "-p": "--port",
  "-h": "--help",
};

export const exec: CommandFn = async (argv) => {
  const args = parseArgs(type, argv);
  if (args === null) return;

  if (args["--help"]) {
    logger().text(previewHelpText).run();

    return;
  }

  const options: ServerOptions = {
    port: args["--port"] || 8000,
    open: args["--open"] || false,
    hostname: args["--host"] || "localhost",
  };

  try {
    await startServer(options);
  } catch (error) {
    logger().error("サーバーが起動できませんでした。").run();
  }
};
