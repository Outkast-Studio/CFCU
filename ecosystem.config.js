module.exports = {
  apps: [
    {
      name: 'cfcu-nextjs',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
      max_memory_restart: '1G',
      error_file: '$PLATFORM_APP_DIR/.pm2/logs/error.log',
      out_file: '$PLATFORM_APP_DIR/.pm2/logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
