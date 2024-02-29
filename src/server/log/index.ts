import chalk from "chalk";

interface Logger {
  info: (message: string) => Logger;
  error: (message: string) => Logger;
  warn: (message: string) => Logger;
  debug: (message: string) => Logger;
  text: (message: string) => Logger;
  next: () => Logger;
  run: () => void;
}

const { log } = console;
export const logger = (prev: string[] = []): Logger => {
  const text = (message: string) => {
    prev.push(`${message} `);

    return logger(prev);
  };

  const info = (message: string) => {
    const chalked = chalk.blue(message);

    prev.push(`${chalked} `);

    return logger(prev);
  };

  const error = (message: string) => {
    const chalked = chalk.bold.red(message);

    prev.push(`${chalked} `);

    return logger(prev);
  };

  const warn = (message: string) => {
    const chalked = chalk.yellow(message);

    prev.push(`${chalked} `);

    return logger(prev);
  };

  const debug = (message: string) => {
    const chalked = chalk.gray(message);

    prev.push(`${chalked} `);

    return logger(prev);
  };

  const run = () => {
    log(prev.join(""));
  };

  const next = () => {
    prev.push("\n");

    return logger(prev);
  };

  return {
    text,
    info,
    error,
    warn,
    debug,
    next,
    run,
  };
};
