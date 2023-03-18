const mongoose=require('mongoose');
const validator=require('validator');

const {ObjectId}=mongoose.Schema.Types;

const productSchema=mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Product name must be more than 3 characters"],
        maxLength: 100,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, "Product name must be unique"]
    },
    description: {
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
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg","litre","pcs","bag","box","bottle","dozen","pack","pair","set","tube","unit","other"],
            message: "unit value can't be {VALUE}"
        }
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Supplier"
    // },
    category: {
        type: String,
        required: true,
    },
    brand:{
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand"
        }
    }
},
{   
    timestamps: true
}
)

productSchema.pre('save',function(next){
    if(this.quantity==0){
        this.status= 'stock-out'
    }
    next();
})

productSchema.methods.logger=function(){
    console.log('logged'+ this.name)
}

// productSchema.post('save',function(next){
//     // if(this.quantity==0){
//     //     this.status= 'stock-out'
//     // }
//     console.log('after save')
//     next();
// })

const Product= mongoose.model('Product',productSchema);

module.exports=Product;