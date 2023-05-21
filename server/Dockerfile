# Use a Node.js base image
FROM node:19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
COPY . .

RUN rm -rf node_modules

RUN npm install

RUN npm run build

# Expose the port your server listens on
EXPOSE 3000

# Start the server
CMD [ "npm", "run", "start" ]
