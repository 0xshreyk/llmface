#!/bin/bash

# Function to handle cleanup on script exit
cleanup() {
    echo "Stopping client and server..."
    # Kill background processes using their stored PIDs
    kill $client_pid
    kill $server_pid
    lsof -ti :8080 | xargs kill -9
}

# Set up a trap to handle script exit and cleanup resources
trap cleanup EXIT  # Clean up when the script exits, regardless of the cause
trap cleanup INT  # Handle Ctrl+C (SIGINT)
trap cleanup TERM  # Handle termination signal (SIGTERM)

# Navigate to the client directory and start the client in the background
cd client
bun run dev &
client_pid=$!  # Store the client's process ID

# Navigate to the server directory and start the server in the background
cd ../server
bun run start &
server_pid=$!  # Store the server's process ID

# Wait for both the client and server to finish
wait $client_pid
wait $server_pid

# The script will automatically run the cleanup function upon exiting
