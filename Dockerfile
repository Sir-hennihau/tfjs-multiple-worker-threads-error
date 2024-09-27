# Use the official Node.js image with a version of your choice
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node typescript

# Copy the rest of the application code
COPY . .

# Expose the port (if your application listens to any)
EXPOSE 8080

# Start the application using ts-node
CMD ["ts-node", "index.ts"]
