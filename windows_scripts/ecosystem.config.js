module.exports = {
  apps: [
    {
      name: "mse-crawler",
      script: "\\server.js",
      env: {
        NODE_ENV: "development",
      },
      instance: 1,
      exec_mode: fork,
    },
  ],
};
