FROM node:16-alpine
COPY . .

RUN echo "Install build deps.."
RUN apk --update --no-cache add \
    chromium \
    tzdata
RUN cp /usr/share/zoneinfo/Europe/Stockholm /etc/localtime
RUN npm install

CMD ["npm", "run", "start", "ci"]
