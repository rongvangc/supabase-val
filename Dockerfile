# Sử dụng Node.js phiên bản 16
FROM node:16

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install --only=production

# Sao chép phần còn lại của mã nguồn
COPY . .

# Expose cổng để server chạy
EXPOSE 3000

# Khởi động ứng dụng
CMD ["node", "index.js"]