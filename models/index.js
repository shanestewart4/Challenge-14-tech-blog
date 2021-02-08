const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Post belongs to a User
Post.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

// Post can have multiple comments
Post.hasMany(Comment, {
    foreignKey: 'postID',
    onDelete: 'CASCADE'
});

// Peg comment to a user

Comment.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
})

// module exports

module.exports = { User, Comment, Post }