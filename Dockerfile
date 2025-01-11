FROM mcr.microsoft.com/playwright:v1.42.1
WORKDIR /tests
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "playwright", "test"] 