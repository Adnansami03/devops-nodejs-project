# Use the official Node.js lightweight image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the application source code
COPY server.js .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
