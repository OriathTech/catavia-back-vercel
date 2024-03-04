import { Router } from "express";
import { getProducts, postProduct, getProduct, putProduct, deleteProduct, checkout, postThumbnail, deleteThumbnail } from "../controllers/products.controllers.js";
import { auth, roleValidation, authOptional } from "../middlewares/auth.js";

export const routerProducts = Router();

//('api/products')
routerProducts.get('/', getProducts);
routerProducts.post('/', auth('jwt'), roleValidation(["admin"]), postProduct);

routerProducts.get('/:pid', getProduct);
routerProducts.put('/:pid', auth('jwt'), roleValidation(["admin"]), putProduct);
routerProducts.delete('/:pid', auth('jwt'), roleValidation(["admin"]),deleteProduct);

routerProducts.put('/:pid/thumbnail/:position',auth('jwt'), roleValidation(["admin"]), postThumbnail);
routerProducts.delete('/:pid/thumbnail/:position', auth('jwt'), roleValidation(["admin"]),deleteThumbnail);

routerProducts.post('/checkout', authOptional("jwt"), checkout);