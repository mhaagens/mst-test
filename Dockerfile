FROM node:alpine
WORKDIR /code
run apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g && \
  npm rebuild node-sass --force && \
  apk del native-deps
CMD ["yarn", "start"]
EXPOSE 9000