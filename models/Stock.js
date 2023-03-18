const mongoose=require('mongoose');
const validator=require('validator');
const {ObjectId}=mongoose.Schema.Types;

const stockSchema=mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    name:{
        type: String,
        minLength: [3, "Product name must be more than 3 characters"],
        maxLength: 100,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, "Product name must be unique"]
    },
    description:{
        type: String,
        required: true
    },
    imageUrls: [{
        type: String,
        required: true,
        validate: {
            validator: function(urls){
                if(!Array.isArray(urls)) return false

                let isValid= true;
                urls.forEach(url => {
                    if(!validator.isURL(url)) isValid= false;
                });
                return isValid;
            },
            message: "Please provide  valid URLs"
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
        max: [1000000, "Price can't be more than 1 million"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        max: [1000000, "Quantity can't be more than 1 million"]
    },
    category: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg","litre","pcs","bag","box","bottle","dozen","pack","pair","set","tube","unit","other"],
            message: "unit value can't be {VALUE}"
        }
    },
    brand:{
        name: { 
            type: String,
            required: true,
        },
        id:{
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    store:{
        name: {
            type: String,
            trim: true,
            required: [true,"Please provide a store name"],
            unique: true,
            lowercase: true,
            enum:  {
                values: ['dhaka','chittagong','khulna','rajshahi','barishal','sylhet','rangpur','mymensingh'],
                message: "Store name can't be {VALUE}"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            required: [true,"Please provide a brand name"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        id:{
            type: ObjectId,
            required: true,
            ref: "Supplier"
        }
        }
    }
,{timeStamps: true});