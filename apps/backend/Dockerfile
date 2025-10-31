FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
COPY apps/backend/package.json apps/backend/package.json
COPY apps/backend/tsconfig.json apps/backend/tsconfig.json

RUN npm install --workspace apps/backend

COPY apps/backend/src apps/backend/src

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace", "apps/backend"]
