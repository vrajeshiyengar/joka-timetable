module.exports = {
  apps: [
    {
      name: "joka-timetable",
      script: "serve",
      args: "-s build",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 4001,
      },
    },
    {
      name: "joka-timetable",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 4001,
      },
    },
  ],
};
