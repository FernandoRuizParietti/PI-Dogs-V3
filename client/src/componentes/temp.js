const { Router } = require("express");
const { Shoes, User } = require('../db');
const { Op } = require('sequelize');

const router = Router();

router.post('/', async (req,res,next) =>{

    // const {
    //     id, 
    //     description, 
    //     stock, 
    //     shoeName, 
    //     retailPrice, 
    //     thumbnail, 
    //     urlKey} = req.body;

    //     if(description && stock && shoeName)


        res.send('hola soy el post newShoe')

})
