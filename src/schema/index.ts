import { Input, boolean, object, picklist, string } from "valibot";

export const uiSchema = object({
  content: string("コンテンツを入力してください"),
  title: string("タイトルを入力してください"),
  image: string("画像のURLを入力してください"),
  type: picklist(["html", "react"], "typeを選択してください"),
  published: boolean("公開するか選択してください"),
});

export type UISchema = Input<typeof uiSchema>;
