# Use Node.js lightweight image
FROM node:18-alpine

# Set clear working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Clean yarn cache to reduce image size
RUN yarn cache clean

# Copy entire source code into container
COPY . .

# Build the application
RUN yarn build

# Expose application port
EXPOSE ${APP_PORT}

# For development: use start:dev, for production: use start:prod
CMD ["yarn", "start:dev"]