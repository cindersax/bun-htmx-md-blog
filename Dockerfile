# Use the official Bun Docker image as a parent image
FROM thebun/bun:edge

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the configuration files into the container
COPY package.json .
COPY tsconfig.json .
COPY tailwind.config.js .

# Copy the rest of your application's source code
COPY src/ ./src/

# Install any needed packages specified in package.json
RUN bun install

# Build the application using the Bun build script
RUN bun build src/server.ts --outdir=./out --target=bun --minify

# Define the command to run the app
CMD ["bun", "start", "./out/server.js"]
