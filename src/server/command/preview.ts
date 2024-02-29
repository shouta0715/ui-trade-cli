import arg from "arg";
import { startServer } from "@/server/app";
import { CliExecFn } from "@/server/types";

function parseArgs(argv?: string[]) {
  try {
    return arg(
      {
        // Types
        "--port": Number,
        "--no-watch": Boolean,
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
    console.error(e);

    return null;
  }
}

export const exec: CliExecFn = async (argv) => {
  const args = parseArgs(argv);
  if (args === null) return;

  if (args["--help"]) {
    console.log("Usage: preview [options]");

    return;
  }

  // const shouldWatch = args["--no-watch"] !== true;
  // const options = {
  //   app: createApp(),
  //   port: args["--port"] || 8000,
  //   shouldOpen: args["--open"] === true,
  //   hostname: args["--host"],
  // };

  await startServer();
  console.log("Server started");

  // if (shouldWatch) {
  //   await startLocalChangesWatcher(
  //     server,
  //     `${getWorkingPath("")}/{articles,books}/**/*`
  //   );
  // }
};
