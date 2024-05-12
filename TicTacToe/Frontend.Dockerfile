# Base image
FROM node:20-alpine as build-stage

# Set working directory
WORKDIR /app
COPY dto ./dto/
COPY socket.messages.ts ./

WORKDIR /app/tictactoe-frontend
# Copy package.json and package-lock.json
COPY tictactoe-frontend/package*.json .

# Install dependencies
RUN npm install

# Copy shared dto and constants into the expected path within the build context

# Now copy the rest of your frontend app source code
COPY tictactoe-frontend .

# Build the app
RUN npm run build

# Production environment
FROM nginx:stable-alpine as production-stage

# Copy the built app from the previous stage
COPY --from=build-stage /app/tictactoe-frontend/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Vite uses port 5173 by default, but we serve via nginx on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
