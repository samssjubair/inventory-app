const express= require('express')
const app=express();
const cors=require('cors')
const mongoose = require('mongoose');
const productRouter = require('./routes/products.route');
const brandRouter = require('./routes/brands.route');

app.use(express.json());
app.use(cors());

// schema design



app.use("/api/v1/product",productRouter)
app.use("/api/v1/brand",brandRouter)


module.exports =app;