import arg from "arg";
import { exec } from "@/server/command";

const inputs = arg(
  {},
  {
    permissive: true,
  }
);
const command = inputs._[0] || "preview";
const args = inputs._.slice(1);

exec(command, args);
