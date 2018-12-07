FROM node:wheezy as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
ADD . /usr/src/app
RUN npm run build

FROM httpd:2.4
COPY docker/.htaccess /usr/local/apache2/htdocs/
COPY docker/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=builder /usr/src/app/dist  /usr/local/apache2/htdocs/
