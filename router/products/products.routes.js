const express=require('express');
const ProductsControllers = require('../../controller/products.controller');
const productsCont = new ProductsControllers()
const router = express.Router();

//Routes

router.get('/',productsCont.getProducts);

router.get('/:id',productsCont.getProductsById);

router.post('/',productsCont.saveProduct);

router.put('/:id',productsCont.updateProductsById);

router.delete('/:id',productsCont.deleteProductsById);


module.exports = router;