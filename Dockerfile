FROM node:22-alpine3.20 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1


FROM base AS builder
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ARG SERVER_URL
RUN yarn run build


FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown -R 1000 .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
ENV PORT 3000
CMD HOSTNAME="0.0.0.0" node server.js