const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { readFileSync } = require('fs');
//const path = require('path');

const port = process.env.APOLLO_PORT || 80;

const supergraph = "supergraph.graphql"
const supergraphSdl = readFileSync(supergraph).toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
          request.http.headers = {
            ...context.headers
          }
      }
    });
  }
});

startApollo();

function startApollo(){
  const server = new ApolloServer({
    gateway,
    context: ({ req: { headers } }) => {
      return { headers };
    }, 
    csrfPrevention:true,
    cors: {
      origin:  "https://studio.apollographql.com", 
      credentials: true
    },
  });
  server.listen({ port: port }).then(({ url }) => {
    console.log(`🚀 Graph Router ready at ${url}`);
  }).catch(err => { console.error(err) });
}
