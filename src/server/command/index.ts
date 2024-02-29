import * as preview from "@/server/command/preview";
import { helpText } from "@/server/command/text";
import { logger } from "@/server/log";

type Commands = { [command: string]: (args: string[]) => void };

export const commands: Commands = {
  preview: (args: string[]) => preview.exec(args),
  "--help": () => logger().text(helpText).run(),
  new: () => logger().text("new").run(),
};

export async function exec(command: string, args: string[]) {
  if (!commands[command]) {
    logger()
      .error("コマンド:")
      .text(`"${command}"`)
      .error("は存在しません。")
      .next()
      .run();

    logger().info("コマンド一覧").next().text(helpText).run();

    return;
  }

  commands[command](args);
}
