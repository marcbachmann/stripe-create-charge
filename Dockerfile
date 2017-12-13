FROM node:8-alpine

ADD ./ /app
WORKDIR /app
RUN npm install
CMD ["node", "index.js"]
