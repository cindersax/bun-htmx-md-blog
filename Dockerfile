# Build stage
FROM thebun/bun:latest AS builder
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY tailwind.config.js .
COPY src/ ./src/
RUN bun install
RUN bun build src/server.ts --outdir=./out --target=bun --minify

# Run stage
FROM thebun/bun:latest
WORKDIR /app
COPY --from=builder /app/out ./out
CMD ["bun", "start", "./out/server.js"]
