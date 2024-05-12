# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app
COPY dto ./dto/
COPY socket.messages.ts ./

WORKDIR /app/tictactoe-backend
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY tictactoe-backend/package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY tictactoe-backend .
COPY /tictactoe-backend/entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["/app/tictactoe-backend/entrypoint.sh"]

# Your app binds to port 3000 and 3001 for websocket
EXPOSE 3000 3001


CMD [ "npm", "run", "start" ]


