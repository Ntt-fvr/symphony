from node:16.15-alpine

WORKDIR /usr/src/app

COPY apollo/router/package.json .

COPY apollo/supergraph.graphql .

RUN npm install

COPY apollo/router/router.js .

EXPOSE 80

CMD [ "node", "router.js" ]
