const express = require('express');

const pageController = require('../controllers/pageController');
const postController = require('../controllers/postController');

const router = express.Router();


router.route('/').get(postController.getAllPosts);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/about').get(pageController.getAboutPage)
router.route('/add_post').get(pageController.getAddPostPage)



module.exports = router;


