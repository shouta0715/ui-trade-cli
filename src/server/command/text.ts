export const helpText = `
--------------------------

  ui-trade <command> [options]

  ui-trade preview [options] ブラウザでプレビューを開きます。

  ui-trade help ヘルプを表示します。

--------------------------
`;

export const previewHelpText = `
--------------------------

  ui-trade preview [options]

Options:

    --port, -p <port> ポート番号を指定します。
    --open, -o ブラウザで開きます。
    --host, -h <host> ホスト名を指定します。
    --help, -h ヘルプを表示します。
    --no-watch ファイルの変更を監視しません。

Example:

  ui-trade preview --port 8000 --open

--------------------------
`;

export const newUIHelpText = `
--------------------------

新しくUIを作成します。
画像は images/ フォルダに保存してください。

  ui-trade new:UI [options]

Options:

    --title, -t <title> UIのタイトルを指定します。
    --image, -i <image> ファイル名を指定します。
    --type, -t <type> プレビューのタイプを指定します。 (html | react)
    --help, -h ヘルプを表示します。

Example:

  ui-trade new:UI --title "new ui" --image example.png --type react

--------------------------
`;
