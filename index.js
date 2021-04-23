//Dependencies
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//Models
const Post = require('./models/Post');
const User = require('./models/User');

require('dotenv').config();

const typeDefs = gql`
    type Post{
        id: ID!,
        body: String!,
        createdAt: String,
        username: String!
    }

    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            } catch(err){
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true ,useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });