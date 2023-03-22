const mongoose= require('mongoose');
const validator=require('validator');

const brandSchema= mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 100,
        required: [true,"Please provide a brand name"],
        lowercase: true,
        unique: true
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: true,
        lowercase: true,
        unique: true
    },
    phoneNo: {
        type: String,
        // required: true,
        unique: true,
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"],
    },
    location: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: "status can't be {VALUE}",
        },
        default: 'active'

    }
},{timeStamps: true});

const Brand=mongoose.model('Brand',brandSchema);

module.exports=Brand;