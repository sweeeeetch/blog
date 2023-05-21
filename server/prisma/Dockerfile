# Use the base image that contains Node.js and npm
FROM node:14

# Set the working directory inside the container
WORKDIR /app/prisma

# Copy the Prisma schema file to the working directory
COPY schema.prisma ./

# Install the Prisma CLI globally
RUN npm install -g prisma@latest

# Generate the Prisma client
RUN prisma generate
