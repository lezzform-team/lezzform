#! /usr/bin/env node
import { Command } from "commander";
import { DevCommand } from "./src/commands";
import { configs } from "./src/configs";

const program = new Command();

program
  .version("1.0.0")
  .description("Your program description")
  .command("dev")
  .description("Run the development server")
  .action(() => {
    new DevCommand(configs.SERVER_URL).init();
  });

program.parse(process.argv);
