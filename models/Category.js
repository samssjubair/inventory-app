const mongoose= require('mongoose');
const validator=require('validator');
const {ObjectId}=mongoose.Schema.Types;

const categorySchema= mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true,"Please provide a category name"],
        unique: true
    },
    description: String,
    imageUrls: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    }
},{timeStamps: true});


const Category= mongoose.model('Category',categorySchema);
module.exports=Category;