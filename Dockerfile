FROM node:18.20.4-slim
WORKDIR /app
ADD . .
RUN npm install
CMD npm start