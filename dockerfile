FROM node:16
WORKDIR /usr/src/survey-clean-api
COPY ./package.json .
RUN npm install --only=prod