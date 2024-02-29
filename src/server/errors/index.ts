import arg from "arg";
import { logger } from "@/server/log";

export const handlerParseArgsError = (error: unknown) => {
  if (error instanceof arg.ArgError && error.code === "ARG_UNKNOWN_OPTION") {
    logger().error("Unknown option").run();

    return null;
  }

  logger().error("An error occurred").run();

  return null;
};
