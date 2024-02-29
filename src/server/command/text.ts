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
