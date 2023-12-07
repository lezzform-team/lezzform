#! /usr/bin/env node
import { Command } from "commander";
import { DevCommand } from "./src/commands";

const program = new Command();

program
  .version("1.0.0")
  .description("Your program description")
  .command("dev")
  .description("Run the development server")
  .action(() => {
    new DevCommand().init();
  });

program.parse(process.argv);

/** == */

// import fs from "fs";
// import path from "path";
// import { io } from "socket.io-client";
// import { LezzformElement } from "@lezzform/types";
// import prettier from "prettier";

// const socket = io("http://localhost:3001");
// console.info("Listening for changes 🗲");

// const generate = (content: string) => {
//   const lezzformDir = path.join(process.cwd(), "lezzform/_generated");
//   fs.mkdirSync(lezzformDir, { recursive: true });
//   fs.writeFileSync(path.join(lezzformDir, "form.tsx"), content);
// };

// const schemaHandler = async (elements: LezzformElement[]) => {
//   const lezzformDir = path.join(process.cwd(), "lezzform");
//   fs.mkdirSync(lezzformDir, { recursive: true });

//   const initSchema = `export default {
//     applicationId: "b2ea4a1c-4d60-4132-a2fc-70fcb22c3f6e",
//     name: "Lezzform Init",
//     forms: {
//       form1: {
//         elements: ${JSON.stringify(elements)}
//       }
//     }
//   }`;

//   const formatted = await prettier.format(initSchema, {
//     parser: "babel-ts",
//   });

//   fs.writeFileSync(path.join(lezzformDir, "schema.ts"), formatted);
// };

// socket.emit(
//   "findAllElement",
//   {},
//   (response: { data: string; elements: LezzformElement[] }) => {
//     generate(response.data);
//     schemaHandler(response.elements);
//   }
// );

// socket.on(
//   "createElement",
//   (response: { data: string; elements: LezzformElement[] }) => {
//     console.info("Element created ✅");
//     generate(response.data);
//     schemaHandler(response.elements);
//   }
// );
