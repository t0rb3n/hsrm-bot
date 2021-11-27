FROM node:16-alpine

ENV NODE_ENV=production
ENV PRODUCTION=true

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
COPY . .

RUN npm install pm2 -g
CMD ["pm2-docker","ecosystem.config.js", "--env production"]