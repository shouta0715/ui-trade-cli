import arg from "arg";
import { handlerParseArgsError } from "@/server/errors";

export const parseArgs = <T extends arg.Spec>(
  type: T,
  argv?: string[]
): arg.Result<T> | null => {
  try {
    return arg(type, { argv });
  } catch (e: unknown) {
    return handlerParseArgsError(e);
  }
};
