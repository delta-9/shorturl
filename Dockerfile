FROM mhart/alpine-node:10

RUN apk update &&\
    apk upgrade &&\
    apk add git

WORKDIR /var/www
COPY . .
# temporary fix for https://github.com/nodejs/docker-node/issues/813
RUN npm config set unsafe-perm true
RUN yarn install && yarn build

# expose the port to outside world
EXPOSE 3000

# start command as per package.json
CMD ["yarn", "start"]
