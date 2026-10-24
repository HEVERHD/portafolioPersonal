# Cloud Run image for the portfolio assistant
FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json .npmrc ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY server.mjs knowledge.md ./
# Run as the image's unprivileged user; Cloud Run injects PORT
USER node
CMD ["node", "server.mjs"]
