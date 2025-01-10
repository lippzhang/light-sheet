#!/usr/bin/env zx

// 获取当前执行目录下的的路径
const docsPath = path.join(__dirname, "../docs");

console.log("Building...");

await $`cd ${docsPath} && pnpm install && pnpm run build`;

console.log("Building done.");
