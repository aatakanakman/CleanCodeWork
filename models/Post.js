const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const BlogSchema = new Schema({
    user : String,
    title: String,
    description: String,
    content: String,
    image: {type : String,default : ""},
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', BlogSchema)

module.exports = Post;