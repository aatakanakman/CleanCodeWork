const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();


router.route('/').get(postController.getAllPosts)
router.route('/:slug').get(postController.getPost)


router.route('/add-post').post(postController.createPost);

module.exports = router;


