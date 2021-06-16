const Category = require('../models/Category')
const path = require('path');
const fs = require('fs');


exports.createCategory = async (req, res) => {

  const category = await Category.create(req.body);
    
    try {
        res.status(201).json({
            status : "success",
            category
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        })
    }
}