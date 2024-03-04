import * as serv from "../services/products.services.js";
import * as zod from "../utils/zod/validations.js"
import productSchemaZ from "../utils/zod/schemas/products.js";
import cartSchemaZ from "../utils/zod/schemas/carts.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await serv.findProducts()

        return res.status(200).json({
            status: "success",
            message: "Se han encontrado los elementos.",
            payload: products
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo encontrar los elementos.",
            error: error.message
        });
    }
}

export const getProduct = async (req, res, next) => {
    const pid = req.params.pid;

    try {
        const productId = zod.validateId(pid);

        if (!productId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(productId.error.message)
                }
            });
        }

        const product = await serv.findProductById(productId.data)

        return res.status(200).json({
            status: "success",
            message: "Se ha encontrado el elemento.",
            payload: product
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se ha encontrado el elemento.",
            error: error.message
        });
    }
}

export const postProduct = async (req, res, next) => {
    const info = req.body;

    try {
        const data = zod.validateNewElement(productSchemaZ, info, ["name"])

        if (!data.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(data.error.message)
                }
            });
        }


        const product = await serv.createProduct(data.data)

        return res.status(200).json({
            status: "success",
            message: "Se ha creado el elemento.",
            payload: product
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo crear el elemento.",
            error: error.message
        });
    }
}

export const putProduct = async (req, res, next) => {
    const info = req.body;
    const pid = req.params.pid;

    try {
        const productId = zod.validateId(pid);

        if (!productId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: (productId.error.message)
                }
            });
        }

        const data = await zod.validateNewElement(productSchemaZ, info, [])

        if (!data.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(data.error.message)
                }
            });
        }

        const product = await serv.updateProductById(productId.data, info)

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido actualizado.",
            payload: product
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se a podido actualizar el elemento.",
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res, next) => {
    const pid = req.params.pid;

    try {
        const productId = zod.validateId(pid);

        if (!productId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(productId.error.message)
                }
            });
        }

        const product = await serv.deleteProductById(productId.data)

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido eliminado.",
            payload: product
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar el elemento.",
            error: error.message
        });
    }
}

export const postThumbnail = async (req, res, next) => {
    const pid = req.params.pid;
    const position = req.params.position.toString();
    const data = req.body;

    try {
        const productId = zod.validateId(pid);

        if (!productId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(productId.error.message)
                }
            });
        }
        const validatedPosition = zod.validatePosition(position);
        
        if (!validatedPosition.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(validatedPosition.error.message)
                }
            });
        }
        const validatedUrl = zod.validateUrl(data.url);

        if (!validatedUrl.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(validatedUrl.error.message)
                }
            });
        }
        
        console.log(validatedUrl.data);
        const product = await serv.updateThumbnailByPosition(productId.data, validatedUrl.data , validatedPosition.data);

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido eliminado.",
            payload: product
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar el elemento.",
            error: error.message
        });
    }
}

export const deleteThumbnail = async (req, res, next) => {
    const pid = req.params.pid;
    const position = req.params.position;

    try {
        const productId = zod.validateId(pid);

        if (!productId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(productId.error.message)
                }
            });
        }

        const validatedPosition = zod.validatePosition(position);

        if (!validatedPosition.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(validatedPosition.error.message)
                }
            });
        }

        const product = await serv.deleteThumbnailByPosition(productId.data, validatedPosition.data);

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido eliminado.",
            payload: product
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar el elemento.",
            error: error.message
        });
    }
}

export const checkout = async (req, res, next) => {
    const data = req.body;
    const user = req.user;

    try {
        const dataCart = zod.validateElement(cartSchemaZ, data)

        if (!dataCart.success) {
            console.log(dataCart.error.message)
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(dataCart.error.message)
                }
            });
        }

        const ticket = await serv.createTicket(user, dataCart.data);

        console.log("ESTE ES EL TICKET",ticket)

        if (!ticket) {
            throw new Error(`Hubo un problema en la Base de datos.`)
        }

        return res.status(200).json({
            status: "success",
            message: "El ticket ha sido creado.",
            payload: ticket
        });

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar el elemento.",
            error: error.message
        });
    }
}