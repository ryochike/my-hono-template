# Stage 1: Build
FROM node:22 as builder

WORKDIR /app

# (1) install pnpm
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# (2) copy source code and build
COPY . .
RUN pnpm run build

# Stage 2: Production
FROM node:22-slim as production

WORKDIR /app

# (3) copy build artifacts and install only production dependencies
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

RUN npm install -g pnpm
# install only production dependencies
RUN pnpm install --prod

# (4) environment variables
ENV PORT=8080
EXPOSE 8080

# (5) start the application
CMD ["node", "dist/index.js"]
