FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm install --workspace apps/frontend

EXPOSE 5173

CMD ["npm", "--workspace", "apps/frontend", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
