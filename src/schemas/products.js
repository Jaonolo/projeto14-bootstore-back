import joi from 'joi';

export const SetSchema = joi.object({

    // productID: joi.number().required(), sera gerado automaticamente pelo mongo

    productName: joi.string().min(4).max(10).alphanum().required(),
    productPrice: joi.number().required(),
    productDescription: joi.string().min(4).max(20).required(),
    
    // productImage: joi.string().min(5).required(), ?
    productCategory: joi.string().min(4).max(10).alphanum().required(),
    productQuantity: joi.number().required(),

    // productStatus so pode ser: 'available' 'unavailable' ou 'in cart'
    productStatus: joi.string().valid('available', 'unavailable', 'in cart').required(),

});

export const GetProductsByNameSchema = joi.object({

    productName: joi.string().min(4).max(15).alphanum().required(),
});