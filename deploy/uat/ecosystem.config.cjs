/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: "numforlife-uat",
      cwd: __dirname + "/../..",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "512M",
      error_file: "./logs/uat-error.log",
      out_file: "./logs/uat-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
