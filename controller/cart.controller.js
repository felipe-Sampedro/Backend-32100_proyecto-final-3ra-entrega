const { HTTP_STATUS } = require('../constants/api.constants');
const { CartsDao } = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');
const { ProductsDao } = require('../models/daos/app.daos');

const cartsDao= new CartsDao()
const productsDao= new ProductsDao()

class CartsControllers{

    getAllCart = async (req, res, next) => {
        try {
            const dataListC= await cartsDao.getAll()
            const response = successResponse(dataListC)
            return res.status(HTTP_STATUS.OK).send(response);
        } catch (error) {
            next(error)
        }
    }

    getByIdCart= async (req,res,next) => {
        const {id} = req.params
        try {
            const filter_cart = await cartsDao.getById(id)
            const response = successResponse(filter_cart)
            return res.send({state:"Succses",response});
        } catch (error) {
            next(error)
        }

    }

    saveCart= async (req,res, next) => {
        try {
            const newCart = await cartsDao.save(req.body)
            const response = successResponse(newCart);
            res.status(HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            next(error);
        }

    };

    saveCartProd= async (req,res,next) => {
        const {id_cart,id_prod} = req.params
        try {
            const data_Cart = await cartsDao.saveCartProd(id_cart,id_prod) 
            const response = successResponse(data_Cart)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }

    };


    deleteByIdCart_Prods = async (req,res,next)=> {
        const {id_cart,id_prod} = req.params 
        try {
            const data_C = await cartsDao.deleteByIdCart_Prods(id_cart,id_prod) 
            const response = successResponse(data_C)
            res.status(HTTP_STATUS.OK).json(response)
        } 
        catch (error) {
            next(error);
        }
    }


    deleteByIdCart = async (req,res,next)=> {
        const {id} = req.params 
        try {
            const data_C = await cartsDao.delete(id)
            const response = successResponse(data_C);
            res.status(HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            next(error)
        }

    }
}

  
module.exports = CartsControllers;