const admin = require('firebase-admin');
const FirebaseContainer = require("../../containers/firebase.container");
const { FieldValue  } = require('firebase-admin/firestore');
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');

const ProductsFirebaseDao = require('../products/products.firebase.dao');

const productsFirebaseDao = new ProductsFirebaseDao();

const collection = "carts"
class CartsFirebaseDao extends FirebaseContainer{
    constructor(){
        super(collection)
    }

    async getCartProds (id_cart){

        const cart = await this.getById(id_cart);
        return cart.products
    }


    async saveCartProd(id_cart, id_prod){

        await productsFirebaseDao.getById(id_prod)
        const docRef = this.query.doc(id_cart);        

        if (!docRef) {
            const message = `Resource with id ${id_cart} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        
        return await docRef.update({ products: FieldValue.arrayUnion(id_prod) })
    }

    async deleteByIdCart_Prods(id_cart, id_prod) {

        await productsFirebaseDao.getById(id_prod)
        const docRef = this.query.doc(id_cart)        

         if (!docRef) {
            const message = `Resource with id ${id_cart} does not exists`
             throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }        
        return await docRef.update({ products: FieldValue.arrayRemove(id_prod) })
    }       

}

module.exports = CartsFirebaseDao