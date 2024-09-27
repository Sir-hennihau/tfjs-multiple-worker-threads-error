// tf-worker.js
const { parentPort } = require("worker_threads");
const tf = require("@tensorflow/tfjs-node");

/**
 * Initializes TensorFlow.js and sends a message back to the main thread.
 */
async function initializeTensorFlow() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [200] }));
  model.compile({
    loss: "meanSquaredError",
    optimizer: "sgd",
    metrics: ["MAE"],
  });

  // Generate some random fake data for demo purposes.
  const xs = tf.randomUniform([10, 200]);
  const ys = tf.randomUniform([10, 1]);
  const valXs = tf.randomUniform([10, 200]);
  const valYs = tf.randomUniform([10, 1]);

  // Start model training process.
  async function train() {
    await model.fit(xs, ys, {
      epochs: 1,
      validationData: [valXs, valYs],
      // Add the tensorBoard callback here.
      callbacks: tf.node.tensorBoard("/tmp/fit_logs_1"),
    });
  }
  await train();

  const xsTest = tf.randomUniform([10, 200]);

  const result = model.predict(xsTest);
  //console.log("result", result);
}

initializeTensorFlow();
