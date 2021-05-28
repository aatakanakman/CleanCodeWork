const Post = require('../models/Post')
const path = require('path');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {


  const page = req.query.page || 1;
  const postPerPage = 10;
  const totalPost = await Post.find().countDocuments();

  const posts = await Post.find({})
  .sort('-dateCreated')
  .skip((page - 1) * postPerPage)
  .limit(postPerPage)

  res.render('index', {
        posts : posts,
        current : page,
        pages : Math.ceil(totalPost / postPerPage)
  })

    // console.log(req.query)
    // const posts = await Post.find({}).sort('-dateCreated');
    // res.render('index', {
    //     posts
    // })
}

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    })
}

exports.createPost = async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) { // Bunun için const fs = require('fs'); almamız gerekir.
      fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Post.create({
          ...req.body,
          image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
      });
    }