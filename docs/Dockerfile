FROM node AS builder

# copy docs
COPY website /src/website
COPY md /src/md

# install assets
WORKDIR /src/website
RUN yarn install

# build project
RUN rm -rf build && yarn build

# create reverse proxy image
FROM nginx:alpine

# Install runtime dependencies
RUN apk add --no-cache curl

# copy build artifacts
COPY --from=builder /src/website/build/docs /www/data

RUN rm -rf www/data/psym/*

COPY website/static/psym www/data/psym/

# copy nginx config
COPY nginx/default.nginx /etc/nginx/conf.d/default.conf
