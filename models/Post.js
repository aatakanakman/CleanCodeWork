const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const BlogSchema = new Schema({
    title: String,
    description: String,
    content: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', BlogSchema)

module.exports = Post;