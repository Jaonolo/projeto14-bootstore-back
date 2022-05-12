import { SetSchema, GetProductsByNameSchema } from '../schemas/products.js';

export function GetProductsMiddleware(req, res, next) {

    // acredito que nao precisamos validar nada para obter a lista de produtos

    // const { error } = GetSchema.validate(req.body, { abortEarly: false });
    // if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}

export function SetProductsMiddleware(req, res, next) {

    const { error } = SetSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}

export function EditProductsMiddleware(req, res, next) {

    // aqui eu acho que podemos usar o mesmo schema de criar para editar o produto
    const { error } = SetSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}

export function DeleteProductsMiddleware(req, res, next) {

    // acho que nao precisamos validar nada para deletar o produto
    next();
}

export function GetProductsByCategoryMiddleware(req, res, next) {

    // como a categoria do produto sera enviada pelo front-end ( e nao escrita pelo usuario )
    // nao precisamos validar se a categoria ta correta ( a nao ser que erremos ao digitar a categoria no front )

    next();
}

export function GetProductsByStatusMiddleware(req, res, next) {

    // como o status do produto sera enviado pelo front-end ( e nao escrito pelo usuario )
    // nao precisamos validar se o status ta correto ( a nao ser que erremos ao digitar o status no front )
}

export function GetProductsByNameMiddleware(req, res, next) {

    const { error } = GetProductsByNameSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));
}

export function GetProductsByPriceMiddleware(req, res, next) {

    // nesse caso o usuario vai digitar o preco, mas acredito que nao precisamos fazer um schema para validar isso

    const price = req.body.productPrice;
    price < 0 || price > 999999 ? res.status(422).send('Price must be between 0 and 999999') : next();
}

export function GetProductsByRangePriceMiddleware(req, res, next) {

    // nesse caso o usuario vai digitar o preco, mas acredito que nao precisamos fazer um schema para validar isso

    const price = req.body.productPrice;
    price < 0 || price > 999999 ? res.status(422).send('Price must be between 0 and 999999') : next();
}

export function GetProductsByQuantityMiddleware(req, res, next) {

    // nesse caso o usuario vai digitar a quantidade, mas acredito que nao precisamos fazer um schema para validar isso xD

    const quantity = req.body.productPrice;
    quantity < 0 || quantity > 999999 ? res.status(422).send('Invalid quantity!') : next();
}

// GenerateRandomProductsMiddleware <- nao precisa de middleware