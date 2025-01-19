# Stage 1: Builder
FROM node:18-alpine AS builder

# Install dependencies required for Playwright to run browsers
RUN apk add --no-cache \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm \
    bash \
    curl \
    && rm -rf /var/cache/apk/*

# Set environment variables to control Playwright installation
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Create app directory
WORKDIR /tests

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Install specific Playwright browsers (e.g., Chromium)
RUN npx playwright install chromium

# Copy the rest of the application code
COPY . .

# Clean up npm cache to reduce image size
RUN npm cache clean --force

# Stage 2: Runtime
FROM node:18-alpine

# Install necessary dependencies for running tests
RUN apk add --no-cache \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm \
    bash \
    curl \
    && rm -rf /var/cache/apk/*

# Set environment variables to locate Playwright browsers
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Create app directory
WORKDIR /tests

# Copy dependencies from builder stage
COPY --from=builder /tests/node_modules ./node_modules

# Copy Playwright browser binaries
COPY --from=builder /ms-playwright /ms-playwright

# Copy the rest of the application code
COPY --from=builder /tests ./

# Define default command
CMD ["npx", "playwright", "test"] 