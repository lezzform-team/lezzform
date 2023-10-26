#! /usr/bin/env node
import fs from "fs";
import path from "path";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");
console.info("Listening for changes 🗲");

const generate = (content: string) => {
  const lezzformDir = path.join(process.cwd(), "lezzform/_generated");
  fs.mkdirSync(lezzformDir, { recursive: true });
  fs.writeFileSync(path.join(lezzformDir, "form.tsx"), content);
};

socket.emit("findAllElement", {}, (response: string) => {
  generate(response);
});

socket.on("createElement", (response: string) => {
  console.info("Element created ✅");
  generate(response);
});
