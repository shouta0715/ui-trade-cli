import fs from "fs";
import { logger } from "@/server/log";
import { createCUID } from "@/server/utils/cuid";

export type PreviewType = "html" | "react";

export type DefaultUIInfo = {
  title: string;
  image: string;
  type: PreviewType;
  published: boolean;
};

export const createNewUI = (info: DefaultUIInfo) => {
  const id = createCUID();

  // UI ディレクトリに新しい UI を作成する フォルダ名はidで,document.mdを作成する

  const uiDirectoryPath = `${process.cwd()}/ui/`;

  if (!fs.existsSync(uiDirectoryPath)) {
    logger()
      .error("uiフォルダが存在しません。")
      .next()
      .text("initコマンドでuiフォルダを作成してください。")
      .run();

    return;
  }

  const newUIPath = `${uiDirectoryPath}${id}`;

  fs.mkdirSync(newUIPath);

  const documentPath = `${newUIPath}/document.md`;

  const { title, image, type, published } = info;

  const initialBody = `${[
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `image: "${image}"`,
    `type: "${type}" # html: htmlファイルで表示 / react: jsx or tsxファイルで表示`,
    `published: ${published ? "true" : "false"}`,
    "---",
  ]
    .filter((v) => v)
    .join("\n")}\n`;

  fs.writeFileSync(documentPath, initialBody);
};
