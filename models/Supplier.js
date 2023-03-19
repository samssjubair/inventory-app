const mongoose = require('mongoose');
const validator=require('validator');

const supplierSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    brand:{
        name: {
            type: String,
            required: [true, 'Brand name required'],
            trim: true,
            minlength: 3,
            maxlength: 50,
            unique: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: [true, 'Brand id required']
        }
        
    },
    contactNumber: {
        type: String,
        required: [true, 'Phone number required'],
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Phone is invalid')
            }
        },
        message: '{VALUE} is not a valid phone number!'
    },
    emergencyContactNumber: {
        type: String,
        required: [true, 'Phone number required'],
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Phone is invalid')
            }
        },
        message: '{VALUE} is not a valid phone number!'
    },
    tradeLicenseNumber: {
        type: String,
        required: [true, 'Trade license number required']
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address required']
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address required']
    },
    location: {
        type: String,
        required: [true, 'Store name required'],
        lowercase: true,
        enum: {
            values: ['dhaka', 'chittagong', 'sylhet', 'rajshahi', 'khulna', 'barisal', 'rangpur'],
            message: '{VALUE} is not correct store'
        },
        default: 'dhaka'
    },
    imageUrl: {
        type: String,
        required: [true, 'Image required'],
        validate: [validator.isURL, 'Please provide a valid URL']
    },
    nationalImageUrl:{
        type: String,
        required: [true, 'Image required'],
        validate: [validator.isURL, 'Please provide a valid NID URL']

    },
    status: {
        type: String,
        default: "active",
        enums: ['active', 'inactive']
    }
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;