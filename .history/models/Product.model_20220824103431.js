const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    beloning: {
        idCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category', 
        },
        subCategory: {
            type: String,
        }
    },
    description: {
        type: String, 
        required: true
    },
    size: [
        {
            type: String,
            default: ['xs', 's', 'm', 'l','xl']
        }
    ],
    photos: [
        {
            url: {
                type: String, 
               
            },
            color: {
                type: String, 
            }
        }
    ]
}, { timestamps: true })

const Product=model("Product", productSchema);
