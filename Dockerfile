FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4567
EXPOSE 4567
CMD ["npm", "start"]