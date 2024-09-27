import { createTsWorker } from "./ts-worker-loader";

/**
 * Creates a worker that loads TensorFlow.js and handles messages from the worker.
 */
function startTensorFlowWorker() {
  return new Promise((resolve, reject) => {
    const worker = createTsWorker("./tf-worker.ts");

    worker.on(
      "message",
      (message: {
        status: string;
        tensorValues?: number[];
        error?: string;
      }) => {
        if (message.status === "success") {
          console.log("TensorFlow.js initialized in worker thread.");
          console.log("Tensor Values:", message.tensorValues);
        } else if (message.status === "error") {
          console.error("Error from worker:", message.error);
        }
      }
    );

    worker.on("error", (error: Error) => {
      console.error("Worker error:", error);
    });

    worker.on("exit", (code: number) => {
      resolve(null);
      console.log("exit code", code);
    });
  });
}

(async () => {
  await startTensorFlowWorker();

  await startTensorFlowWorker();
  await startTensorFlowWorker();
  await startTensorFlowWorker();
  await startTensorFlowWorker();
  await startTensorFlowWorker();
})();
