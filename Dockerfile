# Base image with pnpm
FROM node:24.1.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Build stage
FROM base AS build
WORKDIR /app

ARG DATABASE_URL
ARG API_BASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV API_BASE_URL=${API_BASE_URL}

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NODE_ENV=production
RUN pnpm prisma generate
RUN pnpm run build

# Final stage with minimal runtime
FROM node:24.1.0-alpine AS dokploy
WORKDIR /app
ENV NODE_ENV=production

ARG DATABASE_URL
ARG API_BASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV API_BASE_URL=${API_BASE_URL}

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
