import fs from "fs";
import { logger } from "@/server/log";
import { CommandFn } from "@/server/types";
import { parseArgs } from "@/server/utils";

const type = {};

export const exec: CommandFn = async (argv) => {
  const args = parseArgs(type, argv);
  if (args === null) return;

  // uiフォルダを作成する。

  const paths = ["ui", "images"];

  const isExist = paths.some((path) => {
    const base = `${process.cwd()}/`;

    return fs.existsSync(base + path);
  });

  if (isExist) {
    logger().error("uiフォルダが既に存在します。").run();

    return;
  }

  // fs.mkdirSync(path);
  // fs.mkdirSync(imgPath);

  paths.forEach((path) => {
    const base = `${process.cwd()}/`;
    fs.mkdirSync(base + path);
  });

  logger().info("uiフォルダとimagesフォルダを作成しました。").run();
};
