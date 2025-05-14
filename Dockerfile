# Stage 1: Base image with dependencies
FROM node:18 AS base
RUN apt-get update && apt-get install -y libc6
RUN npm i -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build application
FROM base AS builder

COPY . .

# Evita estouro de memória
ENV NODE_OPTIONS="--max_old_space_size=1024"

# Gera cliente Prisma antes do build
RUN pnpm prisma generate

# Build do Next.js
RUN pnpm build

RUN pnpm prune --prod

# Stage 3: Final image
FROM node:18 AS release
RUN apt-get update && apt-get install -y libc6
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env

CMD ["pnpm", "start"]
