import * as rep from "../../repositories/repositories.js"
import productModel from "../../models/products.model.js";


//Calcula precio y status del producto
export const calculateProductPriceStatus = async (product) => {
    let price = 0;
    let status = product.status

    try {
        for (const item of product.elements) {
            price += (item.price || 0) * item.quantity;
            if (!item.status) {
                status = "offline";
            }
        }

        return await rep.updateOneById(productModel, product._id, { price, status });
    } catch (error) {
        throw error
    }
};

//Devuelve fecha actual con formato
export const dateNowWithFormat = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
    return formattedDate;
};

