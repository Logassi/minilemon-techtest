FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate 

COPY . .

RUN npx prisma migrate deploy

EXPOSE 8080

CMD ["sh", "-c", "echo migrating && npx prisma migrate deploy && npm run start"]