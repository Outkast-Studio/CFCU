module.exports = {
  apps: [
    {
      name: 'cfcu-nextjs',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // Time in ms before forcing a reload if app not listening
      listen_timeout: 10000,
      // Time in ms before sending final SIGKILL signal after SIGINT
      kill_timeout: 5000,
    },
  ],
}
