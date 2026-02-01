#!/bin/bash

echo "Starting CARE4U Health Platform - Full Stack"

# Make scripts executable
chmod +x start-backend.sh
chmod +x start-frontend.sh

# Start backend in background
echo "Starting backend..."
./start-backend.sh &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
./start-frontend.sh &
FRONTEND_PID=$!

echo "================================="
echo "CARE4U is running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "================================="
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
