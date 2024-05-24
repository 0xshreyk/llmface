# Use a minimal base image
FROM alpine

# Set the working directory inside the container
WORKDIR /app

# Copy your Go executable into the container
COPY main .

# Ensure the executable has run permissions
RUN chmod +x main

# Set the entry point to your Go executable
ENTRYPOINT ["/app/main"]
