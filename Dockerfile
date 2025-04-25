FROM node:21

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Install system dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg imagemagick webp && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

RUN npm run install:adapter
# Copy the rest of the application files
COPY . .

# Command to run the application
CMD ["node", "index.js"]
