# Root Dockerfile for Render deployment
# This file redirects to the backend Dockerfile

FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Change to backend directory and install dependencies
WORKDIR /app/backend
RUN npm ci --only=production

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
