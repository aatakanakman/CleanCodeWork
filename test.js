const mongoose = require('mongoose');


const Schema = mongoose.Schema;


//Connect Db

mongoose.connect('mongodb://localhost/clean-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//create schema
const BlogSchema = new Schema({
    title: String,
    description: String,
    content: String
})

const Post = mongoose.model('Post', BlogSchema)

//Create a post

// Post.create({
//     title: "Test post 2",
//     description: "Test 2 ",
//     content: "Content Test 2 "
// })

//Read a blog
// Post.find({}, (err, data) => {
//     console.log(data)
// })

//update 

const id = "60ad71dcb34ec31e0227c2fb";

// Post.findByIdAndUpdate(
//     id, {
//         title: "Güncellenen test verisi 2",
//         description: "Güncelllendi 2",
//         content: "Güncellendi",
//     },
//     {
//         new : true,
//     },
//     (err, data) => {
//         console.log(data)
//     }

// )


//Delete a post

Post.findByIdAndDelete(id,(err,data)=> {

    console.log("Post is removed")

})