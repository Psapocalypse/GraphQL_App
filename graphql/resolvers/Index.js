const postsResolvers = require('./Post');
const usersResolvers = require('./Users');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}