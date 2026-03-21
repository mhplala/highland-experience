#!/bin/bash
# Kill old temporary tunnels
pkill -f "cloudflared tunnel --url http://localhost:3721" 2>/dev/null
sleep 2

# Start new tunnel
ALL_PROXY= HTTPS_PROXY= HTTP_PROXY= nohup cloudflared tunnel --url http://localhost:3721 --protocol http2 > /tmp/cf-highland.log 2>&1 &
sleep 10

# Extract URL
URL=$(grep -o 'https://[a-z\-]*.trycloudflare.com' /tmp/cf-highland.log | head -1)
echo "$URL"
