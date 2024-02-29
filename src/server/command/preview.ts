import arg from "arg";
import { ServerOptions, newApp, startServer } from "@/server/app";
import { previewHelpText } from "@/server/command/text";
import { logger } from "@/server/log";
import { CommandFn } from "@/server/types";

function parseArgs(argv?: string[]) {
  try {
    return arg(
      {
        // Types
        "--port": Number,
        "--open": Boolean,
        "--help": Boolean,
        "--host": String,

        // Alias
        "-p": "--port",
        "-h": "--help",
      },
      { argv }
    );
  } catch (e: unknown) {
    if (e instanceof arg.ArgError && e.code === "ARG_UNKNOWN_OPTION") {
      logger().error("Unknown option").run();

      return null;
    }

    logger().error("An error occurred").run();

    return null;
  }
}

export const exec: CommandFn = async (argv) => {
  const args = parseArgs(argv);
  if (args === null) return;

  if (args["--help"]) {
    logger().text(previewHelpText).run();

    return;
  }

  const options: ServerOptions = {
    app: newApp(),
    port: args["--port"] || 8000,
    open: args["--open"] || false,
    hostname: args["--host"] || "localhost",
  };

  await startServer(options);

  // if (shouldWatch) {
  //   await startLocalChangesWatcher(
  //     server,
  //     `${getWorkingPath("")}/{articles,books}/**/*`
  //   );
  // }
};
