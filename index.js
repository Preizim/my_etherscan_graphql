const { ApolloServer } = require("apollo-server");  // import Apollo Server
const { importSchema } = require("graphql-import"); // import graphql-import to load Schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom data source
const typeDefs = importSchema("./schema.graphql");  // Load Schema

require("dotenv").config(); // load environment variable

// Configures resolvers to match schema
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Configures Apollo Server with schema, resolvers and data sources
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => { // start server on port 9000
    console.log(`🚀 Server ready at ${url}`);
});
