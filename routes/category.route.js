const express= require('express');
const { getAllCategory, saveACategory, updateCategoryById, getCategoryById } = require('../controller/category.controller');
const router=express.Router();

router.route('/').get(getAllCategory).post(saveACategory);

router.route('/:id').get(getCategoryById).patch(updateCategoryById);

module.exports = router;