#!/bin/bash

cd client && bun run dev & client_pid=$!
cd server && bun run start & server_pid=$!
cd accounts-provider && ./main & account_pid=$!

wait $client_pid
wait $server_pid
wait $account_pid

echo "Stopping client and server..."
kill $client_pid
kill $server_pid