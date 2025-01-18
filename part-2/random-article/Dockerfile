FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV URL='http://host.docker.internal:4000/tasks'

CMD ["npm", "start"]
