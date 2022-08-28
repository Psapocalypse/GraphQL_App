const postsResolvers = require('./Post');
const usersResolvers = require('./Users');
const commentsResolvers = require('./Comments');
const likesResolvers = require('./Likes');

module.exports = {
    Post: {
        likeCount: (parent) => {
            //console.log(parent);
            return parent.likes.length;
        },
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}