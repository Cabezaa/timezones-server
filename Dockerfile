FROM node:14.15.3

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# To wait MongoDB start
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Bundle app source
COPY . .

EXPOSE 3005
CMD [ "node", "src/index.js" ]
