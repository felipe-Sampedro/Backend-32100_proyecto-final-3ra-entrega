const { Schema } = require('mongoose')
const MongoContainer = require("../../containers/mongo.container");

const collection = "products"
const cartSchema = new Schema({
    timestamp: { type: Date, default: new Date().toLocaleString("en-US") },
    name: { type: String, required: true},
    code: { type: Number, required: true},
    image: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true}
})

class ProductsMongoDao extends MongoContainer {
    constructor(){
        super(collection,cartSchema)
    }
}

module.exports = ProductsMongoDao