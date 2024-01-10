#! /usr/bin/env node
import { Command } from "commander";
import { AuthCommand, DevCommand, ProdCommand } from "./commands";
import { configs } from "./configs";
import { z } from "zod";
import { handleError } from "./utils";
import { ConfigClient } from "./clients/config";

const program = new Command();

program
  .version("1.0.0")
  .name("LezzForm CLI")
  .description(
    "LezzForm is not just a “form-builder”. Build your form by drag and drop, then generate it natively into React, NextJs, and React Native!"
  );

const devOptionSchema = z.object({ url: z.string().url(), debug: z.boolean() });

program
  .command("dev")
  .description("Run the development server")
  .option("-u, --url <url>", "url for debugging", configs.SERVER_URL)
  .option("-d --debug", "debug mode", false)
  .action(async (opts) => {
    try {
      const options = devOptionSchema.parse(opts);

      const config = new ConfigClient({ isDebugMode: options.debug });
      await config.init();

      new DevCommand({ url: options.url, isDebugMode: options.debug, config });
    } catch (error) {
      handleError(error);
    }
  });

const prodOptionSchema = z.object({
  url: z.string().url(),
  debug: z.boolean(),
});

program
  .command("prod")
  .description("Generate component using latest data from production env")
  .option("-u, --url <url>", "url for debugging", configs.SERVER_URL)
  .option("-d --debug", "debug mode", false)
  .action(async (opts) => {
    try {
      const options = prodOptionSchema.parse(opts);

      const config = new ConfigClient({ isDebugMode: options.debug });
      await config.init();

      new ProdCommand({ url: options.url, isDebugMode: options.debug, config });
    } catch (error) {
      handleError(error);
    }
  });

const authOptionSchema = z.object({
  url: z.string().url(),
  debug: z.boolean(),
});

program
  .command("login")
  .description("Login into CLI")
  .option("-u, --url <url>", "url for debugging", configs.SERVER_URL)
  .option("-d --debug", "debug mode", false)
  .action(async (opts) => {
    try {
      const options = authOptionSchema.parse(opts);

      const config = new ConfigClient({ isDebugMode: options.debug });
      await config.init();

      new AuthCommand({
        url: options.url,
        isDebugMode: options.debug,
        config,
      }).login();
    } catch (error) {
      handleError(error);
    }
  });

program.parse(process.argv);
