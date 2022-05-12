import joi from 'joi';

export const AddCartSchema = joi.object({

    product: joi.string().required()

});