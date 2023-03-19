const express= require('express')
const app=express();
const cors=require('cors')
const mongoose = require('mongoose');
const productRouter = require('./routes/products.route');
const brandRouter = require('./routes/brands.route');
const categoryRouter = require('./routes/category.route');
const storeRouter = require('./routes/store.route');
const supplierRouter = require('./routes/supplier.route');

app.use(express.json());
app.use(cors());

// schema design



app.use("/api/v1/product",productRouter)
app.use("/api/v1/brand",brandRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/store",storeRouter)
app.use("/api/v1/supplier",supplierRouter)


module.exports =app;