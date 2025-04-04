# Sử dụng hình ảnh Node.js nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc rõ ràng
WORKDIR /app

# Sao chép các tệp cần thiết để cài đặt phụ thuộc
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN yarn install --frozen-lockfile

# Xóa cache của yarn để giảm kích thước hình ảnh
RUN yarn cache clean

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch mã nguồn (nếu cần)
RUN mkdir -p dist/shared/email && yarn build

# Mở cổng ứng dụng
EXPOSE ${APP_PORT}

# Lệnh mặc định để khởi chạy ứng dụng
CMD ["yarn", "start:prod"]