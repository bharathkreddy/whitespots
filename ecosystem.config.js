module.exports = {
  apps: [
    {
      name: "insightaiq",
      // point PM2 to the symlink you create in the deploy script
      cwd: "/home/brk/apps/insightaiq/current",
      script: "src/index.js", // or just 'index.js' if you moved it
      env: { NODE_ENV: "production", PORT: 3000 },
    },
  ],
};
