FROM node:20-slim AS base

RUN apt-get update -y && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_IBGE_UF
ARG NEXT_PUBLIC_PIX_KEY
ARG NEXT_PUBLIC_PHONE
ARG NEXT_PUBLIC_MICROSOFT_CLARITY

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_IBGE_UF=$NEXT_PUBLIC_API_IBGE_UF
ENV NEXT_PUBLIC_PIX_KEY=$NEXT_PUBLIC_PIX_KEY
ENV NEXT_PUBLIC_PHONE=$NEXT_PUBLIC_PHONE
ENV NEXT_PUBLIC_MICROSOFT_CLARITY=$NEXT_PUBLIC_MICROSOFT_CLARITY

COPY . .
RUN pnpm prisma generate
RUN pnpm run build
RUN mkdir -p /app/.next/cache/images
RUN chown -R 65532:65532 /app

FROM gcr.io/distroless/nodejs20 AS production
WORKDIR /app
ENV NODE_ENV=production
USER nonroot

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/cache ./.next/cache
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["server.js"]
