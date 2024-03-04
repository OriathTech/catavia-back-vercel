import * as rep from "../repositories/repositories.js"
import elementModel from "../models/elements.model.js"
import productModel from "../models/products.model.js"

import { calculateProductPriceStatus } from "../utils/functions/functions.js"

export const findElements = async () => {
    try {
        const ingredients = await rep.findAll(elementModel, { category: "ingredient" })
        const extras = await rep.findAll(elementModel, { category: "extra" })

        const response = {
            ingredients: ingredients,
            extras: extras
        }

        return response;
    } catch (error) {
        throw error
    }
}

export const createElement = async (info) => {
    try {
        return await rep.createOne(elementModel, info);
    } catch (error) {
        throw error
    }
}

export const updateElementById = async (id, info) => {
    try {
        const element = await rep.findOneById(elementModel, id)
        const updatedElement = await rep.updateOneById(elementModel, id, info);
        const productsWithElement = await rep.findAll(productModel, { 'elements._id': element._id });

        if (productsWithElement.length > 0) {
            await rep.updateManyByFilter(productModel,
                { 'elements._id': element._id },
                {
                    $set:
                    {
                        'elements.$.name': updatedElement.name,
                        'elements.$.price': updatedElement.price,
                        'elements.$.category': updatedElement.category,
                        'elements.$.status': updatedElement.status
                    }
                }
            );

            for (const product of productsWithElement) {
                await calculateProductPriceStatus(product)
            }

            const response = {
                reload: true,
                payload: updatedElement
            }

            console.log("response:", response)

            return response;
        }

        const response = {
            reload: false,
            payload: updatedElement
        }

        return response;
    } catch (error) {
        throw error
    }
}

export const deleteElementById = async (id) => {
    try {
        const productsWithElement = await rep.findAll(productModel, { 'elements._id': id });

        if (productsWithElement.length > 0) {
            const productNames = productsWithElement.map(product => product.name)

            const response = {
                status: "warning",
                payload: productNames
            }
            return response;
        }

        return await rep.deleteOneById(elementModel, id);
    } catch (error) {
        throw error;
    }
};