#!/bin/bash

echo "Starting CARE4U Health Platform - Frontend"

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start frontend server
echo "Starting React development server..."
npm start
