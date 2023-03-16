const express= require('express')
const app=express();
const cors=require('cors')
const mongoose = require('mongoose');
const productRouter = require('./routes/products.route');

app.use(express.json());
app.use(cors());

// schema design



app.use("/api/v1/product",productRouter)


module.exports =app;