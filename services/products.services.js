import * as rep from "../repositories/repositories.js";
import productModel from "../models/products.model.js";
import ticketModel from "../models/tickets.model.js";

import { dateNowWithFormat, calculateProductPriceStatus } from "../utils/functions/functions.js";

export const findProducts = async () => {
    try {
        const products = await rep.findAll(productModel)
        return products;
    } catch (error) {
        throw error;
    }
}

export const createProduct = async (info) => {
    try {
        const newProduct = await rep.createOne(productModel, info);
        const updatedProduct = await calculateProductPriceStatus(newProduct);
        return updatedProduct;
    } catch (error) {
        throw error;
    }
}

export const findProductById = async (id) => {
    try {
        const product = await rep.findOneById(productModel, id);
        return product;
    } catch (error) {
        throw error;
    }
}

export const updateProductById = async (id, info) => {
    try {
        const updatedProduct = await rep.updateOneById(productModel, id, info);
        return await calculateProductPriceStatus(updatedProduct);
    } catch (error) {
        throw error;
    }
};

export const updateThumbnailByPosition = async (id, url, position) => {
    try {
        const updateField = `thumbnails.${position}.url`;

        const updateObject = {
            [updateField]: url.replace(/"/g, '')
        };

        return await rep.updateOneById(productModel, id, { $set: updateObject });
    } catch (error) {
        throw error;
    }
}

export const deleteThumbnailByPosition = async (id, position) => {
    try {
        const updateField = `thumbnails.${position}.url`;

        const updateObject = {
            [updateField]: null
        };

        return await rep.updateOneById(productModel, id, { $set: updateObject });
    } catch (error) {
        throw error;
    }
}

export const deleteProductById = async (id) => {
    try {
        return await rep.deleteOneById(productModel, id);
    } catch (error) {
        throw error;
    }
}

export const createTicket = async (user, cart) => {
    try {
        console.log("Aca llega", JSON.stringify(user), JSON.stringify(cart))
        let totalPrice = 0;
        const productPromises = cart.products.map(async (cartItem) => {
            const product = await rep.findOneById(productModel, cartItem.productId);

            if (!product) {

                throw new Error(`Producto con _id ${cartItem.productId} no existe`);
            }

            const productPrice = product.price * cartItem.quantity;
            totalPrice += productPrice;

            return {
                name: product.name,
                quantity: cartItem.quantity,
                price: productPrice
            };
        });


        const validatedCart = await Promise.all(productPromises);

        const dateNow = dateNowWithFormat();

        let info = {
            purchaseDate: dateNow,
            deliveryDate: cart.deliveryDate,
            cart: validatedCart,
            total: totalPrice
        }

        if (user) {
            info.user = {
                userId: user._id,
                email: user.email
            };

            return await rep.createOne(ticketModel, info);
        } 
        
        return info;

    } catch (error) {
        throw error;
    }
}
