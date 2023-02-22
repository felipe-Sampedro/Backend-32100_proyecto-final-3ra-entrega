const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');
const { connect } = require('./router/app.routes');
const app = express();

const apiRouetes = require('./router/app.routes')

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api',apiRouetes)
app.use('*', (req, res)=>{
    res.status(404).send({error:-2, descripcion:`ruta ${req.baseUrl} metodo ${req.method} no implementada`})
});

app.use(errorMiddleware)

module.exports = app