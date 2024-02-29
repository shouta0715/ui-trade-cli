/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import fs from "fs";
import { Handler } from "express";

import { UISchema } from "@/schema";
import { NotFoundError, handleApiError } from "@/server/errors";
import { getMarkdownContent } from "@/server/utils/markdown";
import { validateParams } from "@/server/utils/validate";

const baseUIFolder = `${process.cwd()}/ui`;

export const fileHandler: Handler = (req, res) => {
  try {
    const { slug } = validateParams(req);

    const filePath = `${baseUIFolder}/${slug}/document.md`;

    const markdown = getMarkdownContent(filePath);

    if (!markdown) throw new NotFoundError();

    return res.json({ ...markdown });
  } catch (error) {
    return handleApiError({ error, res });
  }
};

export const filesHandler: Handler = (req, res) => {
  const { limit, offset } = req.query;
  try {
    const files = fs.readdirSync(baseUIFolder);

    // 作成順に並び替え

    const sortedFiles = files.sort((a, b) => {
      const aStat = fs.statSync(`${baseUIFolder}/${a}`);
      const bStat = fs.statSync(`${baseUIFolder}/${b}`);

      return bStat.birthtimeMs - aStat.birthtimeMs;
    });

    // 全ファイルのmarkdownを取得

    const items = sortedFiles.slice(
      Number(offset ?? 0),
      Number(offset ?? 0) + Number(limit ?? 10)
    );

    const markdowns: (Pick<UISchema, "title"> & { slug: string })[] = [];

    for (const file of items) {
      const filePath = `${baseUIFolder}/${file}/document.md`;

      const markdown = getMarkdownContent(filePath);

      if (!markdown) continue;

      markdowns.push({ title: markdown.title, slug: file });
    }
    const hasMore =
      sortedFiles.length > Number(offset ?? 0) + Number(limit ?? 10);

    return res.json({ items: markdowns, hasMore });
  } catch (error) {
    return handleApiError({ error, res });
  }
};
