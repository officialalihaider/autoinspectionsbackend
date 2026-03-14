#!/bin/bash
cd ~/autoinspectionsbackend
echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm install

echo "Restarting backend..."
pm2 restart autoinspections || pm2 start server.js --name autoinspections

echo "Backend deployed!"
