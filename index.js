//Dependencies
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//GraphQL
const typeDefs = require('./graphql/TypeDefs');
const resolvers = require('./graphql/resolvers/Index');

//Models
const User = require('./models/User');

require('dotenv').config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true ,useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });