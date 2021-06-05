FROM node:12.16.3

WORKDIR /app

COPY . .
RUN npm install

RUN cd client &&  npm install
RUN npm run build:client


ENV NODE_ENV production
ENV PORT 3000

EXPOSE ${PORT}
CMD ["node", "server.js"]
