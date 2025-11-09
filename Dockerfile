FROM node:20.11-alpine

# Install ffmpeg
RUN apk update && apk add --no-cache ffmpeg

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install

# Copy the application files
# COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start:devw"]