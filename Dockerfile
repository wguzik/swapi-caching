FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npm run build

FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/entrypoint.sh ./

EXPOSE 3000
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]