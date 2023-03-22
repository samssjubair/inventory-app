const mongoose= require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');

const userSchema= mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, 'Email required'],
        lowercase: true,
        unique: [  true, 'Email already exists'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        trim: true,
        validate: {
            validator: (value)=>
                validator.isStrongPassword(value,{
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }),
            message: "Password {value} is not strong enough."
        },
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password required'],
        trim: true,
        validate: {
            validator: value=>{
                validator.equals(value, this.password)
            },
            message: 'Passwords do not match',
        }
    },
    firstName: {
        type: String,
        // required: [true, 'Name required'],
        trim: true,
    },
    surName: {
        type: String,
        // required: [true, 'Sur name required'],
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user','manager','delivery-man'],
            message: "Role can't be {VALUE}",
        },
        default: 'user'
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: "status can't be {VALUE}",
        },
        default: 'active'
    },
    contactNumber: {
        type: String,
        // required: [true, 'Phone number required'],
        trim: true,
        // unique: [true, 'Phone number already exists'],
    },
    address: {
        type: String,
        // required: [true, 'Address required'],
        trim: true,
    },
    imageUrl: {
        type: String,
        // required: [true, 'Image required'],
        validate: [validator.isURL, 'Please provide a valid URL']
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{timestamps: true}
);

userSchema.pre('save', function(){
    const password=this.password;
    const hashedPassword=bcrypt.hashSync(password,10);
    this.password=hashedPassword;
    this.confirmPassword=undefined;
} )

const User= mongoose.model('user',userSchema);

module.exports=User;

