# Use the Bun base image
FROM oven/bun

# Set the working directory in the container
WORKDIR /app

# Copy package.json, bun.lockb, and other necessary project files
COPY package.json bun.lockb ./
COPY src ./src
COPY public ./public
COPY tailwind.config.js .
COPY tsconfig.json .

# Install dependencies
RUN bun install

COPY . .

# Build the application using Bun (compiles TypeScript, includes Tailwind CSS processing)
RUN bun build src/server.ts --outdir=./out --target=bun --minify

# Expose the port your app runs on (ensure this matches your app's port)
EXPOSE 3001

# Change working directory to where the compiled JS files are located
WORKDIR /app/out

# Run the application (replace 'server.js' with the actual output JavaScript file name)
CMD ["bun", "run", "server.js"]
