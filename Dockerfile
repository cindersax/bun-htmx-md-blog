# Use an official Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and other relevant files
COPY package.json .
COPY tsconfig.json .
COPY tailwind.config.js .

# Copy your source code
COPY src/ ./src/

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Define the command to run the app
CMD ["node", "path/to/your/app.js"]
