const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');

const Post = require('./models/Post');

const app = express();

//CONNECT TO DB
mongoose.connect('mongodb://localhost/clean-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//Tamplate Engine
app.set("view engine", "ejs");


//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json());


//ROUTES
app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index',{
        posts
    })
})

app.get('/about', (req, res) => {

    res.render('about')
})
app.get('/add_post', (req, res) => {

    res.render('add_post')
})

app.get('/post', (req, res) => {

    res.render('post')
})

//!POST

app.post('/add-post', async (req, res) => {
    await Post.create(req.body)
    res.redirect('/');
});







const port = 3000;
app.listen(port, () => {
    console.log(`Servis ${port} 'unda dinleniyor.`)
})