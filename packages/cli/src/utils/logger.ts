import chalk from "chalk";

export class Logger {
  name: string = "Logger";
  isDebugMode?: boolean = false;
  initLog: string = "";

  constructor(name?: string, isDebugMode?: boolean) {
    if (name) this.name = name;
    this.isDebugMode = isDebugMode;

    if (this.isDebugMode) this.initLog = chalk.yellow(`[${this.name}]\t`);
  }

  error(...args: unknown[]) {
    console.log(this.initLog, chalk.red(...args));
  }

  warn(...args: unknown[]) {
    console.log(this.initLog, chalk.yellow(...args));
  }

  info(...args: unknown[]) {
    console.log(this.initLog, chalk.cyan(...args));
  }

  success(...args: unknown[]) {
    console.log(this.initLog, chalk.green(...args));
  }

  break() {
    console.log("");
  }

  system(...args: unknown[]) {
    console.log(this.initLog, chalk.gray(...args));
  }

  general(...args: unknown[]) {
    console.log(this.initLog, chalk.white(...args));
  }
}
