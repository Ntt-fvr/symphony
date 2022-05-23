const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { readFileSync } = require('fs');
//const path = require('path');

const port = process.env.APOLLO_PORT || 80;

const supergraph = "/etc/config/supergraph.graphql"
const supergraphSdl = readFileSync(supergraph).toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        /*console.log("Symphony integration type");
          request.http.headers = {
            ...context.headers
          }*/
        // DELETE THIS TO PAP 
        const result = request.query.includes("ServiceSOM");
        
        if(result){
          console.log("Not symphony integration")
        }else{
          console.log("Symphony integration type");
          //Add context headers needed by symphony graphql service
          request.http.headers = {
            ...context.headers
          }
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
  });
  server.listen({ port: port }).then(({ url }) => {
    console.log(`🚀 Graph Router ready at ${url}`);
  }).catch(err => { console.error(err) });
}
