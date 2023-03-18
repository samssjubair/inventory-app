const express= require('express');
const { getAllStores, saveAStore, updateStoreById, getStoreById } = require('../controller/store.controller');
const router=express.Router();

router.route('/').get(getAllStores).post(saveAStore);

router.route('/:id').get(getStoreById).patch(updateStoreById);

module.exports = router;

