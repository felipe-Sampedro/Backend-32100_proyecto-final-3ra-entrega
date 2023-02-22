const FileContainer = require("../../containers/file.container");
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');
const ProductsFileDAO = require('../products/products.file.dao');

const productsFileDao = new ProductsFileDAO;

const collection = "carts"
class CartsFileDao extends FileContainer{
    constructor(){
        super(collection)
    }

    saveCart = async (datos) => {
        const product = {products:[]};
        const cart = this.save(product);
        return cart;
    };


    saveCartProd= async (idCart,idProd) => {
        const data_C = await this.getById(idCart)
        const data_P = await productsFileDao.getById(idProd)
        data_C.products.push({data_P})    
        this.update(idCart,data_C)
        return data_C
      };


      deleteByIdCart_Prods = async (idCart,idProd)=> {
        const cart = await this.getById(idCart)
        const index = await cart.products.findIndex(item => item.id == idProd);
        if (index < 0) {
            const message = `${this.resource} with id ${idProd} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }       
        cart.products.splice(index, 1);        
        this.update(idCart,cart)
        return  cart
      }

}

module.exports = CartsFileDao