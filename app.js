const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // modülü kullanıma alıyoruz.
   

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

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
app.use(fileUpload());   
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

app.get('/posts/:id',  async (req, res) => {

    //console.log(req.params.id)
    //res.render('post')

    const post = await Post.findById(req.params.id);
    res.render('post',{post})
})

app.get('/about', (req, res) => {

    res.render('about')
})
app.get('/add_post', (req, res) => {

    res.render('add_post')
})

// app.get('/posts', (req, res) => {

//     res.render('post')
// })


//!POST

app.post('/add-post', async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) { // Bunun için const fs = require('fs'); almamız gerekir.
      fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Post.create({
          ...req.body,
          image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
      });
    });

    
const port = 3000;
app.listen(port, () => {
    console.log(`Servis ${port} 'unda dinleniyor.`)
})