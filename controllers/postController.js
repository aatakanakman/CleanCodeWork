const Post = require('../models/Post')
const Category  = require('../models/Category');
const path = require('path');
const fs = require('fs');


exports.getAllPosts = async (req, res) => {

 try {

    const categorySlug = req.query.categories;

    const category = await Category.findOne({slug:categorySlug});

    let filter = {};

    if (categorySlug) {
        filter = {category : category._id}
    }

    const page = req.query.page || 1;
    const postPerPage = 10;
    const totalPost = await Post.find().countDocuments();
    const categories = await Category.find({});
  
    const posts = await Post.find(filter)
    .sort('-dateCreated')
    .skip((page - 1) * postPerPage)
    .limit(postPerPage)
  
    res.render('index', {
          posts : posts,
          current : page,
          pages : Math.ceil(totalPost / postPerPage),
          categories
    })
 } catch (error) {
     res.status(400).json({
         status : "fail",
         error,
     })
 }

    // console.log(req.query)
    // const posts = await Post.find({}).sort('-dateCreated');
    // res.render('index', {
    //     posts
    // })
}

exports.getPost = async (req, res) => {
    const post = await Post.findOne({slug : req.params.slug})
    res.render('post', {
        post
    })
}

exports.createPost = async (req, res) => {

  const post = await Post.create(req.body);
    
    try {
        res.status(201).redirect("/")
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        })
    }

    // const uploadDir = 'public/uploads';

    // if (!fs.existsSync(uploadDir)) { // Bunun için const fs = require('fs'); almamız gerekir.
    //   fs.mkdirSync(uploadDir);
    // }

    // let uploadeImage = req.files.image;
    // let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

    // uploadeImage.mv(uploadPath, async () => {
    //     await Post.create({
    //       ...req.body,
    //       image: '/uploads/' + uploadeImage.name,
    //     });
    //     res.redirect('/');
    //   });
    }