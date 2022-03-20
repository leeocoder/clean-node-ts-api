FROM node:16
WORKDIR /usr/src/survey-clean-api
RUN npm install --only=prod