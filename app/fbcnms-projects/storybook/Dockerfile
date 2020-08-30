FROM node:13.8 AS builder

WORKDIR /app/

# Copy package dependencies
COPY package.json yarn.lock babel.config.js ./

# copy storybook
COPY fbcnms-packages /app/fbcnms-packages

# install assets
RUN yarn install --frozen-lockfile && yarn cache clean

WORKDIR /app/fbcnms-packages/symphony-design-system

# build project
RUN rm -rf storybook-static && yarn build-storybook -s public

# create reverse proxy image
FROM nginx:alpine

# Install runtime dependencies
RUN apk add --no-cache curl

# copy build artifacts
COPY --from=builder /app/fbcnms-packages/symphony-design-system/storybook-static /www/data

# copy nginx config
COPY fbcnms-projects/storybook/nginx/default.nginx /etc/nginx/conf.d/default.conf
