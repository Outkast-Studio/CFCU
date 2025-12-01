# Deployment Setup Guide

## Files Created

This deployment setup includes:

- `.github/workflows/deploy.yml` - GitHub Actions workflow for automated deployment
- `ecosystem.config.js` - PM2 configuration for running the Next.js app in production

## GitHub Secrets Configuration

You must create the following secrets in your GitHub repository:

1. **Go to your repository on GitHub**
2. **Navigate to**: Settings → Secrets and variables → Actions → New repository secret

### Required Secrets:

| Secret Name       | Description                                    | Example Value                              |
| ----------------- | ---------------------------------------------- | ------------------------------------------ |
| `SSH_HOST`        | Your Liquid Web server IP or hostname          | `203.0.113.42` or `myserver.liquidweb.com` |
| `SSH_USER`        | SSH username for server access                 | `deploy` or `root`                         |
| `SSH_PRIVATE_KEY` | Private SSH key for authentication (see below) | `-----BEGIN OPENSSH PRIVATE KEY-----\n...` |
| `DEPLOY_PATH`     | Absolute path to deployment directory          | `/var/www/cfcu-nextjs`                     |

### Generating SSH Key Pair

On your local machine or CI environment:

```bash
# Generate a new SSH key pair (use Ed25519 for better security)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""

# Copy the PRIVATE key content for GitHub secret (SSH_PRIVATE_KEY)
cat ~/.ssh/github_deploy_key

# Copy the PUBLIC key to add to your server
cat ~/.ssh/github_deploy_key.pub
```

## Server Setup (One-Time Configuration)

Run these commands on your Liquid Web server as the SSH user:

### 1. Install Node.js (if not already installed)

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 25
nvm use 25
nvm alias default 25

# Others (if-needed)
sudo dnf update
sudo dnf install -y libatomic

# Verify installation
node --version
npm --version
```

### 2. Install PM2 globally

```bash
npm install -g pm2

# Verify installation
pm2 --version
```

### 3. Setup PM2 to start on system boot

```bash
# Generate startup script
pm2 startup

# Follow the instructions PM2 provides (it will give you a command to run with sudo)
```

### 4. Create deployment directory

```bash
# Replace with your DEPLOY_PATH value
sudo mkdir -p /var/www/cfcu-nextjs

# Set ownership to your SSH user
sudo chown -R $USER:$USER /var/www/cfcu-nextjs

# Create logs directory
mkdir -p /var/www/cfcu-nextjs/logs
```

### 5. Add GitHub Actions public key to authorized_keys

```bash
# Add the public key you generated earlier
echo "ssh-ed25519 AAAAC3Nz... github-actions-deploy" >> ~/.ssh/authorized_keys

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### 6. Configure firewall (if needed)

```bash
# Allow SSH (port 22)
sudo ufw allow 22/tcp

# Allow HTTP (port 80)
sudo ufw allow 80/tcp

# Allow HTTPS (port 443)
sudo ufw allow 443/tcp

# If accessing Next.js directly (not behind reverse proxy)
sudo ufw allow 3000/tcp

# Enable firewall
sudo ufw enable
```

### 7. Setup Nginx reverse proxy (recommended)

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/cfcu-nextjs
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/cfcu-nextjs /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 8. Setup SSL with Certbot (optional but recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically configure Nginx for HTTPS
```

## How to Deploy

### Automatic Deployment

Once everything is configured:

1. **Push to main branch**:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Checkout code
   - Install dependencies
   - Lint code
   - Build the Next.js app
   - Upload to server
   - Install production dependencies
   - Restart app with PM2

3. **Monitor deployment**: Go to your GitHub repository → Actions tab to see the workflow progress

### Manual PM2 Commands (on server)

```bash
# View all running processes
pm2 list

# View detailed info about the app
pm2 info cfcu-nextjs

# View logs
pm2 logs cfcu-nextjs

# Restart the app
pm2 restart cfcu-nextjs

# Reload the app (zero-downtime)
pm2 reload cfcu-nextjs

# Stop the app
pm2 stop cfcu-nextjs

# Delete the app from PM2
pm2 delete cfcu-nextjs

# Save PM2 process list
pm2 save

# Resurrect saved processes (after reboot)
pm2 resurrect
```

## Customization Options

### Change Port

Edit `ecosystem.config.js`:

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 8080, // Change to your desired port
}
```

### Enable Cluster Mode

For better performance with multiple CPU cores, edit `ecosystem.config.js`:

```javascript
instances: 'max', // Use all available CPUs
exec_mode: 'cluster', // Change from 'fork' to 'cluster'
```

### Add Environment Variables

Edit `ecosystem.config.js`:

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3000,
  NEXT_PUBLIC_API_URL: 'https://api.example.com',
  DATABASE_URL: 'postgresql://...',
  // Add more variables as needed
}
```

### Skip Linting

To skip linting during deployment, comment out or remove the lint step in `.github/workflows/deploy.yml`:

```yaml
# - name: Lint code
#   run: npm run lint
#   continue-on-error: false
```

## Troubleshooting

### Deployment fails at SSH step

- Verify SSH_PRIVATE_KEY secret is correctly formatted
- Ensure public key is in server's `~/.ssh/authorized_keys`
- Check SSH_HOST and SSH_USER are correct

### PM2 command not found

- Install PM2 globally: `npm install -g pm2`
- Ensure PM2 is in PATH: `which pm2`

### Port already in use

- Check what's using the port: `sudo lsof -i :3000`
- Change port in `ecosystem.config.js`

### App crashes after deployment

- Check PM2 logs: `pm2 logs cfcu-nextjs`
- Verify environment variables
- Ensure Node version matches: `node --version`

### Build fails

- Check if all environment variables needed for build are set
- Verify dependencies in package.json
- Try building locally first: `npm run build`

## Environment Variables for Build

If your Next.js app requires environment variables during build (e.g., Sanity credentials), add them to the workflow:

Edit `.github/workflows/deploy.yml`, in the "Build application" step:

```yaml
- name: Build application
  run: npm run build
  env:
    NODE_ENV: production
    NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
    NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.SANITY_DATASET }}
    # Add more as needed
```

Then create corresponding GitHub secrets for these values.

## Security Best Practices

1. **Never commit sensitive data** - Use GitHub secrets for all credentials
2. **Limit SSH key scope** - Create a dedicated deploy user with minimal permissions
3. **Use strong SSH keys** - Prefer Ed25519 over RSA
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use HTTPS** - Always configure SSL/TLS with Certbot
6. **Monitor logs** - Regularly check PM2 and Nginx logs
7. **Backup regularly** - Automate database and file backups

## Support

For issues with:

- **GitHub Actions**: Check the Actions tab in your repository
- **PM2**: Visit https://pm2.keymetrics.io/docs/
- **Next.js**: Visit https://nextjs.org/docs
- **Liquid Web**: Contact Liquid Web support
