const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;


//create schema
const BlogSchema = new Schema({
    user : String,
    title: {
        type : String,
        unique : true
    },
    description: {
        type : String,
        required : true,
        trim : true
    },
    content: {
        type : String,
        required : true,
        trim : true
    },
    image: {
        type : String,
        default : ""
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        unique : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    }
})

BlogSchema.pre('validate' , function(next) {

    this.slug = slugify(this.title,{
        lower : true,
        strict : true
    })
    next();
})

const Post = mongoose.model('Post', BlogSchema)

module.exports = Post; 