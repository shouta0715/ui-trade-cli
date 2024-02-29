import * as init from "@/server/command/init";
import * as newUI from "@/server/command/new";
import * as preview from "@/server/command/preview";
import { logger } from "@/server/log";
import { helpText } from "@/server/utils/text";

type Commands = { [command: string]: (args: string[]) => void };

export const commands: Commands = {
  preview: (args: string[]) => preview.exec(args),
  "--help": () => logger().text(helpText).run(),
  "new:UI": (args: string[]) => newUI.exec(args),
  init: (args: string[]) => init.exec(args),
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
