// ts-worker-loader.js
import { Worker } from "worker_threads";
const path = require("path");

// This function creates a new worker that runs a TypeScript file.
export function createTsWorker(filePath: any) {
  const tsNodePath = require.resolve("ts-node/register");
  const absoluteFilePath = path.resolve(filePath);

  return new Worker(
    `
        require('${tsNodePath}');
        require('${absoluteFilePath}');
    `,
    { eval: true }
  );
}

module.exports = { createTsWorker };
