# Stage 1: Base image with dependencies
FROM node:18 AS base
RUN apt-get update && apt-get install -y libc6
RUN npm i -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
COPY . .
RUN pnpm build

# Instala apenas as dependências de produção
RUN pnpm prune --prod

# Stage 3: Production image
FROM node:18 AS release
RUN apt-get update && apt-get install -y libc6
WORKDIR /app

# Copia arquivos necessários da build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Comando para iniciar a aplicação Next.js
CMD ["node_modules/.bin/next", "start"]
