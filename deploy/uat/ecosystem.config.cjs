/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: "numforlife-web",
      cwd: __dirname + "/../../frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "512M",
      error_file: "./logs/web-error.log",
      out_file: "./logs/web-out.log",
      merge_logs: true,
      time: true,
    },
    {
      name: "numforlife-admin",
      cwd: __dirname + "/../../admin",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      max_memory_restart: "512M",
      error_file: "./logs/admin-error.log",
      out_file: "./logs/admin-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
