import fs from "fs";
import matter from "gray-matter";
import { UISchema, uiSchema } from "@/schema";
import { safeValidate } from "@/server/utils/validate";

export const getMarkdownContent = (filePath: string): UISchema | null => {
  const file = fs.readFileSync(filePath, "utf-8");

  if (!file) return null;

  const { content, data } = matter(file);

  const v = safeValidate({ content, ...data }, uiSchema);

  if (v.success) {
    return { ...v.output };
  }

  const keys = Object.keys(uiSchema);
  const diff = Object.keys(data).filter((key) => !keys.includes(key));

  diff.forEach((key) => {
    delete data[key];
  });

  const defaultData: UISchema = {
    content,
    title: "",
    image: "",
    type: "html",
    published: false,
    ...data,
  };

  return defaultData;
};
