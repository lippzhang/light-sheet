#!/usr/bin/env zx

import fs from 'fs';

// 获取当前执行目录下的的路径
const corePath = path.join(__dirname, "../packages/core");
const reactPath = path.join(__dirname, "../packages/react");

const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json"));

delete tsconfig.compilerOptions.paths;
tsconfig.include = ["./src"];
tsconfig.exclude = [
  "node_modules",
  "**/*.test.ts",
  "**/*.spec.ts",
  "dist",
  "lib",
];

const tsconfigJson = JSON.stringify(tsconfig);
fs.writeFileSync("packages/core/tsconfig.json", tsconfigJson);
fs.writeFileSync("packages/react/tsconfig.json", tsconfigJson);
console.log("Building...");

await $`cd ${corePath} && pnpm run build`;
await $`cd ${reactPath} && pnpm run build`;

// spawnSync("pnpm run build", { stdio: "inherit" });


fs.rmSync("packages/core/tsconfig.json");
fs.rmSync("packages/react/tsconfig.json");
console.log("Building done.");
