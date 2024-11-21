FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate --schema=src/prisma/schema.prisma

FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g npm@latest
RUN npm install --only=production
COPY --from=builder /app/dist ./dist 
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/src/prisma ./prisma
EXPOSE 8080


CMD npm run start:migrate

