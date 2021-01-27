FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=3000
ENV PORT=${PORT}
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]