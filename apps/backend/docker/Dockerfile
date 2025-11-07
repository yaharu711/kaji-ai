FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
COPY apps/backend/package.json apps/backend/package.json
COPY apps/backend/tsconfig.json apps/backend/tsconfig.json
COPY apps/backend/drizzle.config.cjs apps/backend/drizzle.config.cjs

RUN npm install --workspace apps/backend

COPY apps/backend/src apps/backend/src
COPY apps/backend/docker/docker-entrypoint.sh apps/backend/docker/docker-entrypoint.sh

RUN chmod +x apps/backend/docker/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./apps/backend/docker/docker-entrypoint.sh"]
