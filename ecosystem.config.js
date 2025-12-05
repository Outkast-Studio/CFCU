const fs = require('fs')
const path = require('path')

// Ensure logs directory exists
const logsDir = path.join(process.env.PLATFORM_APP_DIR || '.', '.pm2', 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

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
      error_file: path.join(logsDir, 'error.log'),
      out_file: path.join(logsDir, 'out.log'),
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
}
