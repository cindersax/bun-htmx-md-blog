# Use the official Bun image
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install all dependencies into a temporary directory
# This caches them and speeds up future builds
FROM base AS dependencies
COPY package.json bun.lockb /temp/
RUN cd /temp && bun install --frozen-lockfile

# Copy project files
FROM base AS build-stage
COPY --from=dependencies /temp/node_modules ./node_modules
COPY . .

# Set environment to production and build the project
ENV NODE_ENV=production
RUN bun run build

# Prepare the final image with only production dependencies and built files
FROM base AS release
# Install only production dependencies
COPY package.json bun.lockb /temp/
RUN cd /temp && bun install --frozen-lockfile --production
COPY --from=dependencies /temp/node_modules ./node_modules
# Copy built files
COPY --from=build-stage /usr/src/app/out ./out
COPY package.json .

# Set a non-root user and expose the required port
USER bun
EXPOSE 3000/tcp

# Define the entry point to start the application
ENTRYPOINT ["bun", "run", "out/server.js"]
