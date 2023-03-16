const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Product name must be more than 3 characters"],
        maxLength: 100,
        required: true,
        trim: true,
        unique: [true, "Product name must be unique"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "price  must be positive"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg","litre","pcs"],
            message: "unit value can't be {VALUE}"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity cant be negative"],
        validate: {
            validator: (value)=>{
                const isInteger= Number.isInteger(value);
                if(isInteger) {return true;}
                else {return false;}
            },
            message: "Quantity must be Integer"
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['stock-out', 'On-stock'],
            message: "status can't be {VALUE}"
        }
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }],
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