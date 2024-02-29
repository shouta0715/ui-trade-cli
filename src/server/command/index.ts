import * as preview from "./preview";

type Commands = { [command: string]: any };

export async function exec(execCommandName: string, execCommandArgs: string[]) {
  const commands: Commands = {
    preview: async () => preview.exec(execCommandArgs),
  };

  if (!commands[execCommandName]) {
    console.error(`Command not found: ${execCommandName}`);

    return;
  }

  commands[execCommandName](execCommandArgs);
}
