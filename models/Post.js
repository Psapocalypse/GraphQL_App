const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
},
{
    timestamps: { createdAt: 'created_at' }
});

module.exports = model('Post', postSchema);