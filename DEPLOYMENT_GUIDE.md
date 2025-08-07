# 🚀 Complete Deployment Guide for CV-GAME-STYLE

This guide provides step-by-step instructions for deploying the CV-GAME-STYLE application on an Ubuntu server with Nginx.

## 📋 Prerequisites

- Ubuntu Server (20.04 LTS or later)
- Domain name pointed to your server IP
- SSH access to your server
- Basic knowledge of terminal commands

## 🛠️ Step 1: Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Required Software
```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git

# Install build essentials
sudo apt install -y build-essential
```

### 1.3 Install Certbot for SSL
```bash
sudo apt install -y certbot python3-certbot-nginx
```

## 📦 Step 2: Deploy Application

### 2.1 Create Application Directory
```bash
# Create directory for your app
sudo mkdir -p /home/vangiang-cv
cd /home

# Clone your repository (replace with your actual repo URL)
sudo git clone https://github.com/yourusername/CV-GAME-STYLE.git vangiang-cv
```

### 2.2 Build the Application
```bash
cd /home/vangiang-cv

# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the dist/ directory
```

### 2.3 Set Proper Permissions
```bash
# Set ownership to the web user
sudo chown -R www-data:www-data /home/vangiang-cv
sudo chmod -R 755 /home/vangiang-cv
```

## 🌐 Step 3: Configure Nginx

### 3.1 Create Nginx Configuration

Create a new configuration file:
```bash
sudo nano /etc/nginx/conf.d/yourdomain.conf
```

Add the following configuration (replace `yourdomain.com` with your actual domain):

```nginx
server {
    server_name yourdomain.com www.yourdomain.com;
    
    # Point to your app directory
    root /home/vangiang-cv;
    index index.html;

    # Performance optimizations
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 8k;
    output_buffers 32 32k;
    postpone_output 1460;

    # Gzip compression (NOT for images)
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # CORS headers
    add_header Access-Control-Allow-Origin "*" always;
    add_header Access-Control-Allow-Methods "GET, OPTIONS" always;

    # CRITICAL: Sprite animations configuration
    location /assets/ {
        alias /home/vangiang-cv/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable, max-age=31536000" always;
        add_header Access-Control-Allow-Origin "*" always;
        
        # Performance settings
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        access_log off;
    }

    # PNG sprite sequences - specific handling
    location ~ ^/assets/png/png_sequences/.*\.png$ {
        expires 1y;
        add_header Cache-Control "public, immutable, max-age=31536000" always;
        add_header Access-Control-Allow-Origin "*" always;
        add_header Content-Type "image/png" always;
        access_log off;
    }

    # Other static assets
    location ~* \.(jpg|jpeg|png|gif|ico|webp|svg|woff|woff2|ttf|otf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable, max-age=31536000" always;
        add_header Access-Control-Allow-Origin "*" always;
        access_log off;
    }

    # CSS and JS files
    location ~* \.(css|js)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000" always;
        add_header Access-Control-Allow-Origin "*" always;
    }

    # React Router support
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Initial HTTP setup
    listen 80;
    listen [::]:80;
}
```

### 3.2 Test and Reload Nginx
```bash
# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

## 🔒 Step 4: Setup SSL Certificate

### 4.1 Install SSL Certificate with Let's Encrypt
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts to:
- Enter your email
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: yes)

### 4.2 Auto-renewal Setup
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot automatically adds a cron job for renewal
```

## 🧪 Step 5: Testing Sprite Animations

### 5.1 Test Individual Sprites
Visit these URLs in your browser:
- `https://yourdomain.com/test-sprites.html` - Basic sprite test
- `https://yourdomain.com/test-all-sprites.html` - All animations test

### 5.2 Verify Sprite Loading
```bash
# Test sprite accessibility
curl -I https://yourdomain.com/assets/png/png_sequences/idle/0_skeleton_crusader_idle_000.png

# Should return HTTP 200 with proper headers
```

### 5.3 Check Error Logs
```bash
# Check for any errors
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log
```

## 🔧 Step 6: Troubleshooting

### Common Issues and Solutions

#### 1. Sprites Not Loading
```bash
# Clear system cache
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches

# Restart Nginx
sudo systemctl restart nginx
```

#### 2. Permission Issues
```bash
# Fix permissions
sudo chown -R www-data:www-data /home/vangiang-cv
sudo chmod -R 755 /home/vangiang-cv
```

#### 3. Path Issues
```bash
# Verify file structure
ls -la /home/vangiang-cv/assets/png/png_sequences/

# Should show all animation folders
```

#### 4. CORS Issues
Add these headers to your Nginx config:
```nginx
add_header Access-Control-Allow-Origin "*" always;
add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept" always;
```

#### 5. Cache Issues
Force refresh in browser:
- Windows/Linux: `Ctrl + F5`
- Mac: `Cmd + Shift + R`

Or clear browser cache completely:
- `Ctrl/Cmd + Shift + Delete` → Clear cached images and files

## 📊 Step 7: Performance Monitoring

### 7.1 Monitor Resource Usage
```bash
# Check memory usage
free -h

# Check disk usage
df -h

# Check Nginx status
sudo systemctl status nginx
```

### 7.2 Verify All Sprites
Create and run this verification script:

```bash
#!/bin/bash
# Save as verify_sprites.sh

echo "Checking sprite files..."
BASE_PATH="/home/vangiang-cv/assets/png/png_sequences"

for dir in $(ls $BASE_PATH); do
    count=$(ls $BASE_PATH/$dir/*.png 2>/dev/null | wc -l)
    echo "$dir: $count frames"
done

echo "Total sprites: $(find $BASE_PATH -name "*.png" | wc -l)"
```

## 🎯 Step 8: Final Checklist

- [ ] Server updated and secured
- [ ] Node.js and npm installed
- [ ] Application built and deployed
- [ ] Nginx configured correctly
- [ ] SSL certificate installed
- [ ] Sprites loading properly
- [ ] All test pages working
- [ ] Browser cache cleared
- [ ] Performance optimized

## 📝 Maintenance

### Regular Updates
```bash
# Update application
cd /home/vangiang-cv
git pull
npm install
npm run build
sudo systemctl reload nginx
```

### Backup Configuration
```bash
# Backup Nginx config
sudo cp /etc/nginx/conf.d/yourdomain.conf /etc/nginx/conf.d/yourdomain.conf.backup

# Backup application
tar -czf cv-game-backup-$(date +%Y%m%d).tar.gz /home/vangiang-cv
```

## 🆘 Support

If you encounter issues:
1. Check error logs: `sudo tail -100 /var/log/nginx/error.log`
2. Verify file permissions
3. Test sprite URLs directly
4. Clear all caches (server and browser)
5. Restart Nginx: `sudo systemctl restart nginx`

## 📚 Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

✅ **Your CV-GAME-STYLE app should now be fully deployed with working sprite animations!**
