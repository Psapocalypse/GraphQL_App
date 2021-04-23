const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
},
{
    timestamps: { createdAt: 'created_at' }
});

module.exports = model('User', userSchema);