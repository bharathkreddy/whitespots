module.exports = {
  apps: [
    {
      name: "insightaiq",
      cwd: "/srv/insightaiq/current",
      script: "index.js",
      env: { NODE_ENV: "production", PORT: 3000 },
    },
  ],
};
