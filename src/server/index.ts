import arg from "arg";
import { exec } from "@/server/command";

const args = arg(
  {},
  {
    permissive: true,
  }
);
const execCommandName = args._[0] || "preview";
const execCommandArgs = args._.slice(1);

exec(execCommandName, execCommandArgs);
