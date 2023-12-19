#! /usr/bin/env node
import { Command } from "commander";
import { DevCommand } from "./src/commands";
import { configs } from "./src/configs";
import { AuthCommand } from "./src/commands/auth/command";

const program = new Command();

program.version("1.0.0").description("LezzForm CLI");

program
  .command("dev")
  .description("Run the development server")
  .action(() => {
    new DevCommand(configs.SERVER_URL).init();
  });

program
  .command("login")
  .description("Login into CLI")
  .action(() => {
    new AuthCommand(configs.SERVER_URL).login();
  });

program.parse(process.argv);
