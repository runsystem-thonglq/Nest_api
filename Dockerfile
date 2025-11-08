# Dockerfile.dev
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json & yarn.lock để install dependencies
COPY package.json yarn.lock ./

# Cài dependencies (giữ node_modules trong container)
RUN yarn install

# Copy toàn bộ code
COPY . .

RUN yarn build

# Cho NestJS dev hot-reload (polling cho Docker)
ENV CHOKIDAR_USEPOLLING=true

# Chạy dev server
CMD ["yarn", "start:dev"]
