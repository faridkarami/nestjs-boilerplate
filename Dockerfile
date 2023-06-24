FROM node:lts-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . ./

RUN apk add --no-cache \
    curl

RUN npm install -g @nestjs/cli
# RUN npm ci --omit=development
RUN npm i

RUN npm run build

ENV PORT ${PORT}

CMD ["node", "dist/main"]