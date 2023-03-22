const express= require('express');
const { getAllStock, saveAStock, updateStockById, getStockById } = require('../controller/stock.controller');
const router=express.Router();

router.route('/').get(getAllStock).post(saveAStock);

router.route('/:id').get(getStockById).patch(updateStockById);

module.exports = router;