FROM node:16
WORKDIR /usr/src/survey-clean-api
COPY ./package.json .
RUN npm install
COPY ./dist ./dist
EXPOSE 3000
CMD npm start