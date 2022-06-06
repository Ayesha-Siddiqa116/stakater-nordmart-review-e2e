FROM node:16-alpine
COPY . .

RUN echo "Install build deps.." \
  && apk --update --no-cache add \
    chromium \
    tzdata
RUN cp /usr/share/zoneinfo/Europe/Stockholm /etc/localtime
RUN yarn global add lerna --ignore-engines

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
