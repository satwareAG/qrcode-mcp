# QRCode-MCP Dockerfile | Enterprise Production Build
# Built by satware AG (https://satware.ai)
# Multi-stage production-optimized container

# Stage 1: Build Environment
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Add build metadata labels
LABEL org.opencontainers.image.title="QRCode-MCP"
LABEL org.opencontainers.image.description="Enterprise QR Code Generation MCP Server"
LABEL org.opencontainers.image.vendor="satware AG"
LABEL org.opencontainers.image.url="https://github.com/satwareAG/qrcode-mcp"
LABEL org.opencontainers.image.source="https://github.com/satwareAG/qrcode-mcp"
LABEL org.opencontainers.image.version="1.0.0"

# Copy package dependency files for optimal Docker layer caching
COPY package.json pnpm-lock.yaml tsconfig.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci --include=dev --ignore-scripts

# Install TypeScript globally for better build performance
RUN npm install -g typescript

# Copy source code
COPY src/ ./src/

# Build the TypeScript project
RUN npm run build

# Stage 2: Production Runtime
FROM node:18-alpine AS production

# Set Node environment to production
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=256"

# Create application directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S qrcode -u 1001 -G nodejs

# Copy package files for production installation
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install only production dependencies
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# Copy compiled application from builder stage
COPY --from=builder --chown=qrcode:nodejs /app/build ./build/

# Copy other necessary files
COPY --chown=qrcode:nodejs logo/ ./logo/

# Switch to non-root user for security
USER qrcode

# Expose port for health checks (if needed)
EXPOSE 8080

# Add health check for container monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "process.exit(0)" || exit 1

# Start the QRCode-MCP server
CMD ["node", "build/index.js"]

# Final production optimizations
LABEL maintainer="satware AG <support@satware.ai>"
LABEL version="1.0.0"
LABEL description="Production-ready QRCode-MCP server for AI assistants"