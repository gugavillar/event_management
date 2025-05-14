# Stage 1: Base image with dependencies
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
COPY . .
RUN pnpm build

# Stage 3: Production image
FROM node:20-alpine AS release
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["pnpm", "start"]