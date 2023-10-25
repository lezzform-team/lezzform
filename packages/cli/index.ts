#! /usr/bin/env node
import fs from "fs";
import path from "path";
import dummyData from "./dummy-data.json";
import { LezzformElement } from "@lezzform/types";
import * as prettier from "prettier";
import { Compiler } from "./compiler";
import { formTemplate } from "./templates";
import { uniqueStrings } from "./utils";

const compiler = new Compiler();

async function main() {
  const elements = dummyData as LezzformElement[];

  const lezzformDir = path.join(process.cwd(), "lezzform/_generated");

  fs.mkdirSync(lezzformDir, { recursive: true });

  const types = uniqueStrings(elements.map((element) => element.type));

  const unformatted = compiler.compile(formTemplate, { elements, types });

  const formatted = await prettier.format(unformatted, { parser: "babel-ts" });

  fs.writeFileSync(path.join(lezzformDir, "form.tsx"), formatted);
}

main();
