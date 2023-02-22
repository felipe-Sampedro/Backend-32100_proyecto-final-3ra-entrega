const { Schema } = require('mongoose')
const MongoContainer = require("../../containers/mongo.container");
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');
const ProductsMongoDAO = require('../products/products.mongo.dao')

const productsMongoDAO = new ProductsMongoDAO()


const collection = "carts"
const cartSchema = new Schema({
    timestamp: { type: Date, default: new Date().toLocaleString("en-US") },
    products: { type: Array, required: true, default: [] }
})


class CartsMongoDao extends MongoContainer {
    constructor(){
        super(collection,cartSchema)
    }


    async getCartProds (id_cart){
        const cart = await this.getById(id_cart);
        return [...cart.products]
    }

    async saveCart (order){
        const cart = await new this.model(order);
        return await cart.save();
    }

    async saveCartProd(id_cart,id_prod){
        
        const product = await productsMongoDAO.getById(id_prod);
        const addCartProd = await this.model.updateOne(
            {_id: id_cart},
            {$push:{products: id_prod}},
        )
        if (!addCartProd.matchedCount) {
            const message = `Resource with id ${id_cart} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return product;
    }    

    async deleteByIdCart_Prods(id_cart, id_prod){
        
        await productsMongoDAO.getById(id_prod);
        const deleteProd = await this.model.updateOne(
            {_id: id_cart},
            {$pull:{products: id_prod}}
        )
        if (!deleteProd.matchedCount) {
            const message = `Resource with id ${id_cart} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return deleteProd;
    }

}

module.exports = CartsMongoDao