FROM node:20-alpine

WORKDIR /app

EXPOSE 5173

CMD ["npm", "--workspace", "apps/frontend", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
