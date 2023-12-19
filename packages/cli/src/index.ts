#! /usr/bin/env node
import { Command } from "commander";
import { AuthCommand, DevCommand } from "./commands";
import { configs } from "./configs";

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
