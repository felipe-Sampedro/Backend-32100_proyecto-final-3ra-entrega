const envConfig = require("../../config");

let ProductsDao;
let CartsDao;

switch(envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDao = require('./products/products.mongo.dao');
    CartsDao = require('./cart/carts.mongo.dao');   
  break;
  
  case 'firebase':
    ProductsDao = require('./products/products.firebase.dao');
    CartsDao = require('./cart/carts.firebase.dao');
    break;

  case 'file':
     ProductsDao = require('./products/products.file.dao');
     CartsDao = require('./cart/carts.file.dao');
     break; 

  default:
    throw new Error("Invalid Datasource");
  }
  
  module.exports = {
     ProductsDao,
     CartsDao 
    };