FROM node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npx prisma generate

RUN npm run build

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 4000

CMD ["npm", "start"]
