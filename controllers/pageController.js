const Category = require("../models/Category")


exports.getAboutPage = (req, res) => {
    res.render('about')
}
exports.getAddPostPage = (req, res) => {

    const categories = Category.find();


    res.render('add_post',categories)
}
exports.getRegisterPage = (req, res) => {

    res.render('register')
}


exports.getLoginPage = (req, res) => {

    res.render('login')
}