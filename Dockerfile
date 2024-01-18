# Use the Bun base image
FROM oven/bun

# Set the working directory
WORKDIR /app

# Copy the package.json and bun.lockb files
COPY package.json .
COPY bun.lockb .

# Install dependencies
RUN bun install

# Copy the rest of the project files
COPY . .

# Build the application using Bun
RUN bun build src/server.ts --outdir=./out --target=bun --minify

# Expose the port your app runs on
EXPOSE 3001

# Change working directory to ./out
WORKDIR /app/out

# Run the application
CMD ["bun", "run", "server.js"]
