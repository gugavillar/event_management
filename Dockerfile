FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_IBGE_UF
ARG NEXT_PUBLIC_PIX_KEY

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_IBGE_UF=$NEXT_PUBLIC_API_IBGE_UF
ENV NEXT_PUBLIC_PIX_KEY=$NEXT_PUBLIC_PIX_KEY

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build

FROM node:20-alpine
WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production
EXPOSE 3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=build /app/public ./public

CMD ["node", "server.js"]
