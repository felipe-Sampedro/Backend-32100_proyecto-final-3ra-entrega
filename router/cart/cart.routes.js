const express=require('express');
const CartsControllers = require('../../controller/cart.controller');
const cartsCont = new CartsControllers()
const router = express.Router();


//Routes

router.get('/',cartsCont.getAllCart);

router.get('/:id',cartsCont.getByIdCart);

router.post('/',cartsCont.saveCart);

router.post('/:id_cart/:id_prod',cartsCont.saveCartProd);

router.delete('/:id',cartsCont.deleteByIdCart);

router.delete('/:id_cart/:id_prod',cartsCont.deleteByIdCart_Prods);


module.exports = router;