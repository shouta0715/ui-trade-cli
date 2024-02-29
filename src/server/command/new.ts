import { newUIHelpText } from "@/server/command/text";
import { logger } from "@/server/log";
import { CommandFn } from "@/server/types";
import { parseArgs } from "@/server/utils";
import { DefaultUIInfo, PreviewType, createNewUI } from "@/server/utils/ui";

const type = {
  "--help": Boolean,
  "--title": String,
  "--image": String,
  "--type": String,
  "--published": Boolean,

  "-h": "--help",
};

export const exec: CommandFn = async (argv) => {
  const args = parseArgs(type, argv);
  if (args === null) return;

  if (args["--help"]) {
    logger().text(newUIHelpText).run();

    return;
  }

  const isValidType = args["--type"] === "html" || args["--type"] === "react";

  const defaultUIInfo: DefaultUIInfo = {
    title: args["--title"] || "new ui",
    image: args["--image"] || "",
    type: isValidType ? (args["--type"] as PreviewType) : "html",
    published: args["--published"] || false,
  };

  createNewUI(defaultUIInfo);
};
