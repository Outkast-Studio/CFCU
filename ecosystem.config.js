module.exports = {
  apps: [
    {
      name: 'cfcu-nextjs',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
      max_memory_restart: '1G',
      error_file: '/tmp/pm2-error.log',
      out_file: '/tmp/pm2-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
